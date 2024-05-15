import { UserEntity } from '../api/user/entities/user.entity';

export interface IUserPayload {
  sub: UserEntity['id'];
  email: UserEntity['email'];
  iat: number;
  exp: number;
}
