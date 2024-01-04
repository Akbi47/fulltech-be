import { ThrowException } from '@app/utils/common';
import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly throwException: ThrowException) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    if (!request.user) {
      this.throwException.throwHttpException(
        'Not authorized',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return true;
  }
}
