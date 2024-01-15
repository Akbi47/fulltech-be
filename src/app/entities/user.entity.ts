import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  AfterInsert,
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Account } from './account.entity';
import { TwoFactorConfirmation } from './two-factor-confirmation.entity';
import { generateHash } from '../utils/token';
import { UserRole, UserStatus } from '../shares/enums/user.enum';

@Entity({ name: 'user' })
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'random id',
  })
  @Expose({ name: 'id' })
  id: string;

  @Column({ name: 'cid', nullable: true })
  @ApiProperty({
    description: 'custom id',
  })
  @Expose({ name: 'cid' })
  cid: string | null;

  @Column({ name: 'email' })
  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The email address of the user',
    format: 'email',
  })
  @Expose({ name: 'email' })
  email: string;

  @Column({ name: 'name' })
  @ApiProperty({
    description: 'name of user',
    example: 'user',
  })
  @Expose({ name: 'name' })
  name: string;

  @Column({ name: 'password', nullable: true })
  @ApiProperty({
    description: 'The password of user',
    example: 'cb4afaa0_fd5dk*49a9@b02085730da02094',
  })
  @Expose({ name: 'password' })
  password: string;

  @Column({
    type: 'varchar',
    length: 120,
    name: 'bio',
    default: '',
    nullable: true,
  })
  @ApiProperty({
    description: 'Describe or express something about user',
    example: 'i am graceful',
  })
  @Expose({ name: 'bio' })
  bio: string | null;

  @Column({ name: 'emailVerified', nullable: true })
  @ApiProperty({
    description: 'The date and time when the email was verified',
    type: Date,
  })
  @Expose({ name: 'emailVerified' })
  emailVerified: Date | null;

  @Column({
    name: 'role',
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  @ApiProperty({
    description: 'The role of the user',
    enum: UserRole,
  })
  @Expose({ name: 'role' })
  role: UserRole;

  @Column({
    name: 'status',
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.INACTIVE,
  })
  @ApiProperty({
    description: 'The status of the user',
    enum: UserStatus,
  })
  @Expose({ name: 'status' })
  status: UserStatus;

  @ApiProperty({
    description: 'The accounts associated with the user',
    type: [Account],
  })
  @Expose({ name: 'account' })
  @OneToMany(() => Account, (account) => account.user)
  accounts: Account[];

  @Column({ name: 'isTwoFactorEnabled', default: false })
  @ApiProperty({
    description: 'The flag for two factor authentication',
    type: Boolean,
  })
  @Expose({ name: 'isTwoFactorEnabled' })
  isTwoFactorEnabled?: boolean;

  @Column({ name: 'twoFactorConfirmation', type: 'jsonb', nullable: true })
  @ApiProperty({
    description: 'The two factor confirmation details',
    type: TwoFactorConfirmation,
  })
  @Expose({ name: 'twoFactorConfirmation' })
  @OneToOne(
    () => TwoFactorConfirmation,
    (twoFactorConfirmation) => twoFactorConfirmation.user,
  )
  twoFactorConfirmation: TwoFactorConfirmation | null;

  @BeforeInsert()
  async setPassword(): Promise<void> {
    if (this.password) {
      const { hashPassword } = await generateHash(this.password);
      this.password = hashPassword;
    }
    if (this.cid) {
      console.log(this.cid);

      this.id = this.cid;
    }
  }
}
