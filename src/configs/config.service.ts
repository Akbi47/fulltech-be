import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { MysqlInstanceConfig } from './database.config';
@Injectable()
export class TypeOrmConfigServiceForMysql implements TypeOrmOptionsFactory {
  constructor() { }
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      ...MysqlInstanceConfig(),
    };
  }
}
