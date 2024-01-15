import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from './configs/config.module';
import { UserModule, AuthModule, AccountModule } from './modules'
import { AuthMiddleware } from 'src/libs/infrastructure/auth/middlewares';

@Module({
  imports: [ConfigModule, UserModule, AuthModule, AccountModule],
  controllers: [],
  providers: [],
})
export class AppModule {
}
