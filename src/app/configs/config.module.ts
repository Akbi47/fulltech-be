import { Global, Module, Post } from '@nestjs/common';
import {
  ConfigModule as NestConfigModule,
  ConfigService as NestConfigService,
} from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigServiceForPostgres } from './config.service';
import { AppConfigService } from './app.config.service';

@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [NestConfigModule],
      useClass: TypeOrmConfigServiceForPostgres,
      inject: [NestConfigService],
    })
  ],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class ConfigModule { }
