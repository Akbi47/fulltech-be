import { HttpException, HttpStatus } from '@nestjs/common';

export class ThrowException {
  throwHttpException(message: string, statusCode: HttpStatus) {
    const messageResponse = message.toUpperCase();
    throw new HttpException(messageResponse, statusCode);
  }
}
