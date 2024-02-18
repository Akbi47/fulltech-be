import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  Version,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { camelCaseKeys, snakeCaseKeys } from '@app/utils/convertcase.util';
import { User } from '@app/entities';
import { ApiUser } from './decorators';
import { AuthGuard } from 'src/libs/infrastructure/auth/guards';
import { UpdateUserDto } from './dto/update-user.dto';
import { EmailDto, IdDto } from '@app/shares/dtos/param.dto';
import { AccountService } from '../account/account.service';
import { CreateUserProvidersDto } from './dto/create-user-providers.dto';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly accountService: AccountService,
  ) {}
  @Post('create')
  @Version('1')
  @ApiOperation({
    summary: 'Create a new user',
    description: 'Create a new user by infomations (username, email, password)',
  })
  async createUser(@Body() request: CreateUserDto): Promise<any> {
    const data = (await this.userService.createUser(
      camelCaseKeys(CreateUserDto, request),
    )) as User;

    const result = snakeCaseKeys(User, data) as User;
    return result;
    // return this.userService.buildUserResponse(result);
  }

  @Post('provider/create')
  @Version('1')
  @ApiOperation({
    summary: 'Create a new user by providers',
    description: 'Create a new user by infomations (username, email, image)',
  })
  async createUserByProviders(
    @Body() request: CreateUserProvidersDto,
  ): Promise<any> {
    const data = await this.userService.createUserByProviders(
      camelCaseKeys(CreateUserProvidersDto, request),
    );

    const result = snakeCaseKeys(CreateUserProvidersDto, data);
    return result;
    // return this.userService.buildUserResponse(result);
  }

  @Get('/:id')
  @Version('1')
  @ApiOperation({
    summary: 'Get user informations',
    description:
      'Get user information (username, email, image, id) after login',
  })
  async getUserById(@Param() param: IdDto) {
    const result = await this.userService.getUserById(param);
    return result;
  }

  @Get('email/search')
  @Version('1')
  @ApiOperation({
    summary: 'Get account informations by email',
    description: 'Get account informations by email',
  })
  async getAccountByEmail(@Query() emailDto: EmailDto) {
    const result = await this.userService.getUserByEmail(emailDto);
    return result;
  }

  // @Get()
  // @ApiBearerAuth('JWT-auth')
  // @ApiSecurity('JWT-auth')
  // @UseGuards(AuthGuard)
  // async getUser(@ApiUser() user: User): Promise<UserResponseInterface> {
  //   return this.userService.buildUserResponse(user);
  // }

  // @Patch()
  // @ApiBearerAuth('JWT-auth')
  // @ApiSecurity('JWT-auth')
  // @UseGuards(AuthGuard)
  // async updateUser(
  //   @ApiUser('id') userId: string,
  //   @Body() request?: UpdateUserDto,
  // ): Promise<UserResponseInterface> {
  //   const user = await this.userService.updateUser(userId, request);
  //   return this.userService.buildUserResponse(user);
  // }
}
