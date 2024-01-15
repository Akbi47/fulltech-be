import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    type: String,
    example: 'anhkhoaquachvo@gmail.com',
    name: 'email',
    required: true,
  })
  @IsNotEmpty()
  @IsEmail()
  @Expose({ name: 'email' })
  email: string;


  @ApiProperty({
    description: 'password of user',
    example: 'aihsjru283!',
    name: 'password',
    required: true,
  })
  @IsNotEmpty()
  @Expose({ name: 'password' })
  password: string;
}
