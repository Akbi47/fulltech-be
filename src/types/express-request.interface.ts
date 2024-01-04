import { User } from '@app/entities';
import { Request } from 'express';

export interface ExpressRequest extends Request {
  user?: User;
}
