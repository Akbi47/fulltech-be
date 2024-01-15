import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { PostgresInstanceConfig } from './database.config';
import { ConfigService } from '@nestjs/config';
import {
  User,
  Account,
  PasswordResetToken,
  TwoFactorConfirmation,
  TwoFactorToken,
  VerificationToken,
} from '@app/entities';
@Injectable()
export class TypeOrmConfigServiceForPostgres implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      // ...PostgresInstanceConfig(),
      type: 'postgres',
      host: this.configService.get<string>('DB_HOST'),
      port: this.configService.get<number>('DB_PORT'),
      username: this.configService.get<string>('DB_USERNAME'),
      password: this.configService.get<string>('DB_PASSWORD'),
      database: this.configService.get<string>('DB_NAME'),
      // running migration
      entities: [
        User,
        Account,
        PasswordResetToken,
        TwoFactorConfirmation,
        TwoFactorToken,
        VerificationToken,
      ], // production environment
      synchronize: false, // production environment

      // auto synchronize
      // entities: [__dirname + '/dist/**/index.js'], // dev environment
      // synchronize: true, // dev environment
    };
  }
}
