import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsArray, ValidateNested } from 'class-validator';
import { Expose } from 'class-transformer';

export class CreateUserResponseDto {
  constructor(user: CreateUserDto) {
    this.user = user;
  }

  @ApiProperty({
    example: '[{}]',
    type: Array,
  })
  @IsArray()
  @ValidateNested()
  public user?: CreateUserDto;

  @ApiProperty({
    example: 'zwqkrediasdjf09834#$%%jklas0jwe',
    type: String,
  })
  @Expose({ name: 'id' })
  public id?: string;
}
