import { IsOptional } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from "class-transformer";

export class TagDTO {
  @ApiProperty({
    example: 'product',
    type: String,
    required: false,
    name: 'name',
  })
  @IsOptional()
  @Expose({ name: 'name' })
  public name?: string
}