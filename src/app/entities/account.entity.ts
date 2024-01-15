// Import the decorators and types from the nestjs-typeorm and class-validator packages
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  Unique,
  PrimaryColumn,
  ManyToOne,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { User } from './user.entity';

// Define the entity class for the Account model
@Entity({ name: 'account' })
@Unique(['provider', 'providerAccountId'])
export class Account {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'random id',
  })
  @Expose({ name: 'id' })
  id: string;

  @Column({ name: 'user_id' })
  @ApiProperty({
    description: 'The user id associated with the account',
    name: 'user_id',
  })
  @Expose({ name: 'user_id' })
  userId: string;

  @Column({ name: 'type', nullable: true })
  @ApiProperty({
    description: 'The type of the account',
  })
  @Expose({ name: 'type' })
  type: string;

  @Column({ name: 'provider', nullable: true })
  @ApiProperty({
    description: 'The provider of the account',
  })
  @Expose({ name: 'provider' })
  provider: string;

  @Column({ name: 'providerAccountId', nullable: true })
  @ApiProperty({
    description: 'The provider account id of the account',
    name: 'provider_account_id',
  })
  @Expose({ name: 'providerAccountId' })
  providerAccountId: string;

  @Column({ name: 'refresh_token', type: 'text', nullable: true })
  @ApiProperty({
    description: 'The refresh token of the account',
    name: 'refresh_token',
  })
  @Expose({ name: 'refresh_token' })
  refreshToken: string | null;

  @Column({ name: 'access_token', type: 'text', nullable: true })
  @ApiProperty({
    description: 'The access token of the account',
    name: 'access_token',
  })
  @Expose({ name: 'access_token' })
  accessToken: string | null;

  @Column({ name: 'expires_at', nullable: true })
  @ApiProperty({
    description: 'The expiration date of the access token',
    name: 'expires_at',
    type: Number
  })
  @Expose({ name: 'expires_at' })
  expiresAt: number | null;

  @Column({ name: 'token_type', nullable: true })
  @ApiProperty({
    description: 'The type of the token',
    name: 'token_type',
  })
  @Expose({ name: 'token_type' })
  tokenType: string | null;

  @Column({ name: 'scope', nullable: true })
  @ApiProperty({
    description: 'The scope of the token',
  })
  @Expose({ name: 'scope' })
  scope: string | null;

  @Column({ name: 'id_token', type: 'text', nullable: true })
  @ApiProperty({
    description: 'The id token of the account',
    name: 'id_token'
  })
  @Expose({ name: 'id_token' })
  idToken: string | null;

  @Column({ name: 'session_state', nullable: true })
  @ApiProperty({
    description: 'The session state of the account',
    name: 'session_state'
  })
  @Expose({ name: 'session_state' })
  sessionState: string | null;

  
  @Column({ name: 'image', default: '', nullable: true })
  @ApiProperty({
    description: 'Image of user',
  })
  @Expose({ name: 'image' })
  image: string | null;

  // Define the one-to-one relation with the User entity
  @ManyToOne(() => User, (user) => user.accounts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;
}



