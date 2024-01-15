import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAccountProvidersDto {
  @ApiProperty({
    description: 'The user id associated with the account',
    name: 'user_id',
  })
  @IsString()
  @Expose({ name: 'user_id' })
  userId?: string;

  @ApiProperty({
    description: 'The type of the account',
  })
  @IsString()
  @IsOptional()
  @Expose({ name: 'type' })
  type?: string;

  @ApiProperty({
    description: 'The provider of the account',
  })
  @IsString()
  @IsOptional()
  @Expose({ name: 'provider' })
  provider?: string;

  @ApiProperty({
    description: 'The provider account id of the account',
    name: 'providerAccountId',
  })
  @IsString()
  @IsOptional()
  @Expose({ name: 'providerAccountId' })
  providerAccountId?: string;

  @ApiProperty({
    description: 'The refresh token of the account',
    name: 'refresh_token',
  })
  @IsString()
  @IsOptional()
  @Expose({ name: 'refresh_token' })
  refreshToken?: string | null;

  @ApiProperty({
    description: 'The access token of the account',
    name: 'access_token',
  })
  @IsString()
  @IsOptional()
  @Expose({ name: 'access_token' })
  accessToken?: string | null;

  @ApiProperty({
    description: 'The expiration date of the access token',
    name: 'expires_at',
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  @Expose({ name: 'expires_at' })
  expiresAt?: number | null;

  @ApiProperty({
    description: 'The type of the token',
    name: 'token_type',
  })
  @IsString()
  @IsOptional()
  @Expose({ name: 'token_type' })
  tokenType?: string | null;

  @ApiProperty({
    description: 'The scope of the token',
  })
  @IsString()
  @IsOptional()
  @Expose({ name: 'scope' })
  scope?: string | null;

  @ApiProperty({
    description: 'The id token of the account',
    name: 'id_token',
  })
  @IsString()
  @IsOptional()
  @Expose({ name: 'id_token' })
  idToken?: string | null;

  @ApiProperty({
    description: 'The session state of the account',
    name: 'session_state',
  })
  @IsString()
  @IsOptional()
  @Expose({ name: 'session_state' })
  sessionState?: string | null;

  @ApiProperty({
    description: 'The image of user',
    example: 'https://avatars.githubusercontent.com/u/46617372?v=4',
    format: 'image',
  })
  @IsString()
  @IsOptional()
  @Expose({ name: 'image' })
  image?: string;
}
