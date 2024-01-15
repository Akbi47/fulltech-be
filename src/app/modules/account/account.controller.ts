import { Body, Controller, Get, Param, Post, Version } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { camelCaseKeys, snakeCaseKeys } from '@app/utils/convertcase.util';
import { Account } from '@app/entities';
import { AccountService } from './account.service';
import { CreateUserDto } from '../user/dto';
import { CreateAccountProvidersDto } from './dto/create-account-providers.dto';
import { IdDto } from '@app/shares/dtos/param.dto';

@Controller('account')
@ApiTags('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}
  @Post('create')
  @Version('1')
  @ApiOperation({
    summary: 'Create a new account',
    description: 'Create a new account',
  })
  async createAccountByProviders(
    @Body() request: CreateAccountProvidersDto,
  ): Promise<any> {
    const data = await this.accountService.createAccountByProviders(
      camelCaseKeys(CreateAccountProvidersDto, request),
    );

    const result = snakeCaseKeys(CreateAccountProvidersDto, data);
    return result;
  }

  @Get('user/:id')
  @Version('1')
  @ApiOperation({
    summary: 'Get account informations by user_id',
    description: 'Get account informations by user_id',
  })
  async getAccountByUserId(@Param() param: IdDto) {
    const result = await this.accountService.getAccountByUserId(param);
    return result;
  }

  @Get('provider/:id')
  @Version('1')
  @ApiOperation({
    summary: 'Get account informations by user_id',
    description: 'Get account informations by user_id',
  })
  async getAccountByProviderId(@Param() param: IdDto) {
    const result = await this.accountService.getAccountByProviderId(param);
    return result;
  }

  // @Get('/:id')
  // @Version('1')
  // @ApiOperation({
  //   summary: 'Get user informations',
  //   description:
  //     'Get user information (username, email, image, id) after login',
  // })
  // async getUserById(@Param() param: IdDto) {
  //   const result = await this.userService.getUserById(param);
  //   return result;
  // }

  // @Get('account/:id')
  // @Version('1')
  // @ApiOperation({
  //   summary: 'Get account informations by user_id',
  //   description: 'Get account informations by user_id',
  // })
  // async getAccountByUserId(@Param() param: IdDto) {
  //   const result = await this.accountService.getAccountByUserId(param);
  //   return result;
  // }

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
