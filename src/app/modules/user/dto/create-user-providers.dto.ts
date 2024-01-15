import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserProvidersDto {
  @ApiProperty({
    example: '0717a285-582e-49e8-b876-22221a3c694d',
    description: 'The custom id of the user',
    name: 'cid',
  })
  @IsString()
  @IsNotEmpty()
  @Expose({ name: 'cid' })
  cid: string;

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

}
