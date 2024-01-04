import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { env } from 'process';

export interface IUseConfirmPasswordGuard {
  confirmPassword: string;
}

@Injectable()
export class AwsIotRequestGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const token = request.headers['x-aws-iot-core'];

    if (!token) {
      throw new HttpException('Token is not provided', HttpStatus.BAD_REQUEST);
    }

    if (token !== env.AWS_IOT_REQUEST_TOKEN) {
      throw new HttpException(
        'AWS IoT Token is not valid',
        HttpStatus.FORBIDDEN,
      );
    }

    return true;
  }
}
