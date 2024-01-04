import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@app/entities/user.entity';
import { ResponseUtil } from '@app/utils/response.util';
import { ThrowException } from '@app/utils/common';
import { AuthGuard } from 'src/libs/infrastructure/auth/guards';

@Module({
  providers: [UserService, ResponseUtil, ThrowException, AuthGuard],
  exports: [UserService],
  controllers: [UserController],
  imports: [TypeOrmModule.forFeature([User])],
})
export class UserModule {}
