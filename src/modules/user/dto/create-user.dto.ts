import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { LoginUserDto } from './login-user.dto';

export class CreateUserDto extends LoginUserDto {
  @ApiProperty({
    type: String,
    example: 'adagio',
    name: 'username',
    required: true,
  })
  @IsNotEmpty()
  @Expose({ name: 'username' })
  public username: string;

  @ApiProperty({
    description: 'describe or express something about user',
    example: 'i am graceful',
    name: 'bio',
    required: false,
  })
  @IsOptional()
  @Expose({ name: 'bio' })
  public bio?: string;

  @ApiProperty({
    description: 'avatar image of user',
    example: '',
    name: 'avatar_image',
    required: false,
  })
  @IsOptional()
  @Expose({ name: 'avatar_image' })
  public avatarImage?: string;
}
