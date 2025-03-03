import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { LoginUserDto } from './login-user.dto';

export class CreateUserDto {

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The email address of the user',
    name: 'email',
    format: 'email',
  })
  @IsEmail()
  @IsNotEmpty()
  @Expose({ name: 'email' })
  email: string;

  @ApiProperty({
    type: String,
    example: 'adagio',
    name: 'name',
    required: true,
    description: 'name of user',
  })
  @IsString()
  @IsNotEmpty()
  @Expose({ name: 'name' })
  name: string;

  @ApiProperty({
    description: 'The password of user',
    example: 'cb4afaa0_fd5dk*49a9@b02085730da02094',
    format: 'password',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Expose({ name: 'password' })
  password: string;
}
