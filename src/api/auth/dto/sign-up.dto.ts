import { PickType } from '@nestjs/swagger';
import { UserEntity } from '../../user/entities/user.entity';

export class SignUpDto extends PickType(UserEntity, [
  'email',
  'password',
  'userName',
  'firstName',
  'lastName',
  'address',
  'phone',
] as const) {}
