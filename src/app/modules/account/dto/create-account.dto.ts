import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class CreateAccountDto{

  @ApiProperty({
    description: 'The user id associated with the account',
  })
  @IsString()
  @Expose({ name: 'user_id' })
  userId?: string;

  @ApiProperty({
    description: 'The refresh token of the account',
  })
  @IsString()
  @Expose({ name: 'refresh_token' })
  refreshToken?: string | null;

  @ApiProperty({
    description: 'The access token of the account',
  })
  @IsString()
  @Expose({ name: 'access_token' })
  accessToken?: string | null;

  @ApiProperty({
    description: 'The expiration date of the access token',
  })
  @IsNumber()
  @Expose({ name: 'expires_at' })
  expiresAt?: number | null;
}
