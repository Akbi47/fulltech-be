import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEmail, IsString, MinLength } from 'class-validator';
import { hash } from 'bcrypt';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'random id',
  })
  id?: string;

  @Column({ name: 'email' })
  @IsEmail()
  @ApiProperty({
    description: 'email of user',
    example: 'user1@gmail.com',
  })
  @Expose({ name: 'email' })
  email: string;

  @Column({ name: 'username' })
  @IsString()
  @ApiProperty({
    description: 'email of user',
    example: 'user1@gmail.com',
  })
  @Expose({ name: 'username' })
  username: string;

  @Column({ name: 'password' })
  @IsString()
  @MinLength(8)
  @ApiProperty({
    description: 'password of user',
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
  @IsString()
  @ApiProperty({
    description: 'describe or express something about user',
    example: 'i am graceful',
  })
  @Expose({ name: 'bio' })
  bio: string;

  @Column({ name: 'avatar_image', default: '', nullable: true })
  @IsString()
  @ApiProperty({
    description: 'avatar image of user',
  })
  @Expose({ name: 'avatar_image' })
  avatarImage: string;

  @BeforeInsert()
  async setPassword(): Promise<void> {
    const saltRounds = 10;
    this.password = await hash(this.password, saltRounds);
  }
}
