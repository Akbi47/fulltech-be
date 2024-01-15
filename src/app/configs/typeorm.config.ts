import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { Account, PasswordResetToken, TwoFactorConfirmation, TwoFactorToken, User, VerificationToken } from './../entities';

config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [
    User,
    Account,
    PasswordResetToken,
    TwoFactorConfirmation,
    TwoFactorToken,
    VerificationToken,],
  migrations: ['dist/migrations/*.js'],
  migrationsRun: true,
});

AppDataSource.initialize();
