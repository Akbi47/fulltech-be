import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TagModule } from './tag/tag.module';
import { ConfigModule } from './config/config.module';
import { UserModule } from './user/user.module';
import { AuthMiddleware } from 'src/libs/infrastructure/auth/middlewares';

@Module({
  imports: [ConfigModule, TagModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
