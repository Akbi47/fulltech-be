import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  Entity,
  Unique,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

// Define the entity class for the TwoFactorConfirmation model
@Entity({ name: 'two_factor_confirmation' })
@Unique(['userId'])
export class TwoFactorConfirmation {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'random id',
  })
  @Expose({ name: 'id' })
  id: string;

  @Column({ name: 'userId' })
  @ApiProperty({
    description: 'The user id associated with the confirmation',
  })
  @Expose({ name: 'userId' })
  userId: string;

  // Define the one-to-one relation with the User entity
  @OneToOne(() => User, (user) => user.twoFactorConfirmation, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
