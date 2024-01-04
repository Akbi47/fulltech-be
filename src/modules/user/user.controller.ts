import { Body, Controller, Get, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { camelCaseKeys, snakeCaseKeys } from '@app/utils/convertcase.util';
import { UserResponseInterface } from './types/create-user-response.interface';
import { User } from '@app/entities';
import { ApiUser } from './decorators';
import { AuthGuard } from 'src/libs/infrastructure/auth/guards';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) { }
  @Post('create')
  async createUser(
    @Body() request?: CreateUserDto,
  ): Promise<UserResponseInterface> {
    const data = (await this.userService.createUser(
      camelCaseKeys(CreateUserDto, request),
    )) as User;

    const result = snakeCaseKeys(User, data) as User;

    return this.userService.buildUserResponse(result);
  }

  @Post('login')
  async login(@Body() request?: LoginUserDto): Promise<UserResponseInterface> {
    const data = await this.userService.loginUser(
      camelCaseKeys(LoginUserDto, request),
    );

    const result = snakeCaseKeys(User, data) as User;

    return this.userService.buildUserResponse(result);
  }

  @Get()
  @ApiBearerAuth('JWT-auth')
  @ApiSecurity('JWT-auth')
  @UseGuards(AuthGuard)
  async getUser(@ApiUser() user: User): Promise<UserResponseInterface> {
    return this.userService.buildUserResponse(user);
  }

  @Patch()
  @ApiBearerAuth('JWT-auth')
  @ApiSecurity('JWT-auth')
  @UseGuards(AuthGuard)
  async updateUser(
    @ApiUser('id') userId: string,
    @Body() request?: UpdateUserDto
  ): Promise<UserResponseInterface> {
    const user = await this.userService.updateUser(userId, request);
    return this.userService.buildUserResponse(user);
  }
}
