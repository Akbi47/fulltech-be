import { Body, Controller, Post, Version } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { Account, User } from '@app/entities';
import { camelCaseKeys, snakeCaseKeys } from '@app/utils/convertcase.util';
import { JwtService } from '@nestjs/jwt';
import { ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from '../user/dto';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}
  @Post('login')
  @Version('1')
  async login(@Body() request?: LoginUserDto): Promise<any> {
    const data = await this.authService.userLogin(
      camelCaseKeys(LoginUserDto, request),
    );

    const result = snakeCaseKeys(Account, data);
    return result;
  }
}
