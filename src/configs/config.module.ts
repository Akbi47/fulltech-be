import { Global, Module, Post } from '@nestjs/common';
import {
  ConfigModule as NestConfigModule,
  ConfigService as NestConfigService,
} from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigServiceForMysql } from './config.service';
import { AppConfigService } from './app.config.service';
import { AppDataSource } from './typeorm.config';
import { MysqlInstanceConfig } from './database.config';

@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [NestConfigModule],
      useClass: TypeOrmConfigServiceForMysql,
      inject: [NestConfigService],
    })
  ],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class ConfigModule { }
