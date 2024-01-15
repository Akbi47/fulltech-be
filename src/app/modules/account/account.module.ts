import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
// import { AccountController } from './account.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from '@app/entities/account.entity';
import { ResponseUtil } from '@app/utils/response.util';
import { ThrowException } from '@app/utils/common';
import { AuthGuard } from 'src/libs/infrastructure/auth/guards';
import { AccountController } from './account.controller';

@Module({
  providers: [AccountService, ResponseUtil, ThrowException, AuthGuard],
  exports: [AccountService],
  controllers: [AccountController],
  imports: [TypeOrmModule.forFeature([Account])],
})
export class AccountModule {}
