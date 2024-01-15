import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { httpErrors } from '@app/shares/exceptions';
import { validateHash } from '@app/utils/token';
import { LoginUserDto } from '../user/dto';
import { User } from '@app/entities';
import { JWT_CONSTANTS } from './auth.constants';
import { AccountService } from '../account/account.service';
import { CreateAccountDto } from '../account/dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private accountService: AccountService,
    private jwtService: JwtService,
  ) {}

  async userLogin(loginUserDto: LoginUserDto): Promise<CreateAccountDto | any> {
    const { email, password } = loginUserDto;

    const user = await this.userService.findOne({
      where: { email },
      select: ['id', 'role', 'name', 'password'],
    });

    if (!user) {
      throw new BadRequestException(httpErrors.ACCOUNT_NOT_FOUND);
    }
    const isPasswordCorrect = await validateHash(password, user.password);
    if (!isPasswordCorrect) {
      throw new BadRequestException(httpErrors.UNAUTHORIZED);
    }

    delete user.password;

    const account = await this.accountService.findOne({
      where: { userId: user.id },
      select: ['userId', 'accessToken'],
    });
    if (account) {
      console.log('--acc', account);
      return { account };
    }

    const [accessToken, refreshToken] = await Promise.all([
      this.generateUserAccessToken(user),
      this.generateUserRefreshToken(user),
    ]);

    const payload = {
      userId: user.id,
      accessToken,
      refreshToken,
    } as CreateAccountDto;

    await this.accountService.createAccount(payload);

    return payload;
  }

  async generateUserAccessToken(user: User): Promise<string> {
    const { role, id, name } = user;
    return this.jwtService.signAsync(
      {
        sub: id,
        name,
        role,
        date: this.dayNow,
      },
      {
        secret: JWT_CONSTANTS.userAccessTokenSecret,
        expiresIn: JWT_CONSTANTS.userAccessTokenExpiry,
      },
    );
  }

  async generateUserRefreshToken(user: User): Promise<string> {
    const { role, id, name } = user;
    const refreshToken = await this.jwtService.signAsync(
      {
        sub: id,
        name,
        role,
        date: this.dayNow,
      },
      {
        secret: JWT_CONSTANTS.userRefreshTokenSecret,
        expiresIn: JWT_CONSTANTS.userRefreshTokenExpiry,
      },
    );

    return refreshToken;
  }

  dayNow = Date.now();
  //   async signIn(username, pass) {
  //     const user = await this.userService.findOne(username);
  //     if (user?.password !== pass) {
  //       throw new UnauthorizedException();
  //     }
  //     const payload = { sub: user.userId, username: user.username };
  //     return {
  //       access_token: await this.jwtService.signAsync(payload),
  //     };
  //   }
}
