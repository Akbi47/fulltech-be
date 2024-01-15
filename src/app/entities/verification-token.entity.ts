import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { Entity, Unique, PrimaryGeneratedColumn, Column } from 'typeorm';

// Define the entity class for the VerificationToken model
@Entity({ name: 'verificationToken' })
@Unique(['email', 'token'])
export class VerificationToken {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'random id',
  })
  @Expose({ name: 'id' })
  id: string;

  @Column({ name: 'email' })
  @ApiProperty({
    description: 'The email address of the user',
    example: 'john.doe@example.com',
    format: 'email',
  })
  @Expose({ name: 'email' })
  email: string;

  @Column({ name: 'token' })
  @ApiProperty({
    description: 'The verification token',
  })
  @Expose({ name: 'token' })
  token: string;

  @Column({ name: 'expires' })
  @ApiProperty({
    description: 'The expiration date of the token',
    type: Date,
  })
  @Expose({ name: 'expires' })
  expires: Date;
}
