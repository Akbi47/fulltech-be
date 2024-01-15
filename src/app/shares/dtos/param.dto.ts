import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class IdDto {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  id: string;
}

export class EmailDto {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export class IdsDto {
  @ApiProperty({
    required: true,
    type: [String],
  })
  @IsNotEmpty()
  @IsArray()
  ids: string[];
}
