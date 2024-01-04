import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateUserDto {

  @ApiProperty({
    type: String,
    example: 'anhkhoaquachvo@gmail.com',
    name: 'email',
    required: false,
  })
  @IsOptional()
  @IsEmail()
  @Expose({ name: 'email' })
  public email: string;

  @ApiProperty({
    type: String,
    example: 'adagio',
    name: 'username',
    required: false,
  })
  @IsOptional()
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
