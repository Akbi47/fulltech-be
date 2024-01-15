import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@app/entities/user.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { UserResponseInterface } from './types';
import { ConfigService } from '@nestjs/config';
import { compare } from 'bcrypt';
import { ThrowException } from '@app/utils/common';
import { httpErrors } from '@app/shares/exceptions';
import { UserStatus } from '@app/shares/enums/user.enum';
import { validateHash } from '@app/utils/token';
import { Account } from '@app/entities';
import { IdDto } from '@app/shares/dtos/param.dto';
import { CreateAccountProvidersDto } from './dto/create-account-providers.dto';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    private readonly config: ConfigService,
    private readonly throwException: ThrowException,
  ) {}
  // async createUser(
  //   createUserDto: CreateUserDto,
  // ): Promise<CreateUserResponseDto> {
  //   const { email, username } = createUserDto;

  //   const userByEmail = await this.userRepository.findOne({
  //     where: { email },
  //   });

  //   const userByUsername = await this.userRepository.findOne({
  //     where: { username },
  //   });

  //   if (userByEmail || userByUsername) {
  //     throw new BadRequestException(httpErrors.ACCOUNT_EXISTED);
  //   }
  //   const newUser = this.userRepository.create(createUserDto);
  //   // newUser.status = UserStatus.ACTIVE;

  //   return await this.userRepository.save(newUser);
  // }

  async createAccount(createAccountDto: CreateAccountDto): Promise<any> {
    const newAccount = await this.accountRepository.create(createAccountDto);
    return await this.accountRepository.save(newAccount);
  }

  async createAccountByProviders(
    createAccountDto: CreateAccountProvidersDto,
  ): Promise<any> {
    const newAccount = await this.accountRepository.create(createAccountDto);
    return await this.accountRepository.save(newAccount);
  }

  async getAccountByUserId(param: IdDto): Promise<any> {
    const { id } = param;
    return await this.findOne({ where: { userId: id } });
  }

  async getAccountByProviderId(param: IdDto): Promise<any> {
    const { id } = param;
    return await this.findOne({ where: { providerAccountId: id } });
  }

  // generateJwt(user: User): string {
  //   return sign(
  //     {
  //       id: user.id,
  //       username: user.username,
  //       email: user.email,
  //     },
  //     this.config.get<string>('JWT_SECRET'),
  //   );
  // }

  // buildUserResponse(user: User): UserResponseInterface {
  //   try {
  //     return {
  //       user: {
  //         ...user,
  //         token: this.generateJwt(user),
  //       },
  //     };
  //   } catch (e) {
  //     this.throwException.throwHttpException(
  //       `${e}`,
  //       HttpStatus.UNPROCESSABLE_ENTITY,
  //     );
  //     return;
  //   }
  // }

  public async findOne(where: FindOneOptions<Account>) {
    return this.accountRepository.findOne(where);
  }
}
