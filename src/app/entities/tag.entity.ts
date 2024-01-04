import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tags' })
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'The unique identifier of the tag',
  })
  id?: string;

  @Column({
    type: 'varchar'
  })
  @ApiProperty({
    description: 'name of the tag',
    example: 'product',
  })
  name?: string;
}
