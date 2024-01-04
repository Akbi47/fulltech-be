import { User } from '@app/entities';

export type UserType = Omit<User, 'setPassword'>;
