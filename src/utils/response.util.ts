import { MessageDto } from './dto/message.dto';

export class ResponseUtil {
  returnResponseMessage(
    responseMessage: MessageDto[] = [],
    returnData: any = {},
    status: number,
  ) {
    return {
      status,
      messages: responseMessage,
      data: returnData,
    };
  }
}
