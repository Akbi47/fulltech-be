import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto, CreateUserResponseDto, LoginUserDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@app/entities/user.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { compare } from 'bcrypt';
import { ThrowException } from '@app/utils/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { httpErrors } from '@app/shares/exceptions';
import { UserStatus } from '@app/shares/enums/user.enum';
import { validateHash } from '@app/utils/token';
import { EmailDto, IdDto } from '@app/shares/dtos/param.dto';
import { CreateUserProvidersDto } from './dto/create-user-providers.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly config: ConfigService,
    private readonly throwException: ThrowException,
  ) {}

  async createUser(
    createUserDto: CreateUserDto,
  ): Promise<CreateUserResponseDto> {
    const { email, name } = createUserDto;

    const userByEmail = await this.userRepository.findOne({
      where: { email },
    });

    const userByName = await this.userRepository.findOne({
      where: { name },
    });

    if (userByEmail || userByName) {
      throw new BadRequestException(httpErrors.ACCOUNT_EXISTED);
    }
    const newUser = await this.userRepository.create(createUserDto);
    newUser.status = UserStatus.ACTIVE;

    return await this.userRepository.save(newUser);
  }

  async createUserByProviders(
    createUserDto: CreateUserProvidersDto,
  ): Promise<any> {
    const { email, name } = createUserDto;

    const userByEmail = await this.userRepository.findOne({
      where: { email },
    });

    const userByName = await this.userRepository.findOne({
      where: { name },
    });

    if (userByEmail || userByName) {
      throw new BadRequestException(httpErrors.ACCOUNT_EXISTED);
    }
    const newUser = await this.userRepository.create(createUserDto);
    newUser.status = UserStatus.ACTIVE;

    return await this.userRepository.save(newUser);
  }

  async getUserById(param: IdDto): Promise<any> {
    const { id } = param;

    const userById = await this.userRepository.findOne({
      where: { id },
    });

    if (!userById) {
      throw new BadRequestException(httpErrors.ACCOUNT_NOT_FOUND);
    }
    delete userById.password;
    return userById;
  }

  async getUserByEmail(emailDto: EmailDto): Promise<any> {
    const { email } = emailDto;
    const userByEmail = await this.userRepository.findOne({
      where: { email },
    });

    if (!userByEmail) {
      throw new BadRequestException(httpErrors.ACCOUNT_NOT_FOUND);
    }
    delete userByEmail.password;
    return userByEmail;
  }

  async updateUser(userId: string, request: UpdateUserDto): Promise<User> {
    const user = await this.findById(userId);
    Object.assign(user, request);
    return await this.userRepository.save(user);
  }

  async findById(id: string): Promise<User> {
    return this.userRepository.findOne({
      where: { id },
    });
  }
  public async findOne(where: FindOneOptions<User>) {
    return await this.userRepository.findOne(where);
  }

  generateJwt(user: User): string {
    return sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      this.config.get<string>('JWT_SECRET'),
    );
  }
}
