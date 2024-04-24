import { PickType } from '@nestjs/swagger';
import { UserEntity } from '../entities/user.entity';
export class UpdateUserDto extends PickType(UserEntity, [
  'userName',
  'firstName',
  'lastName',
  'email',
  'role',
  'password',
  'age',
  'address',
  'phone',
  'company',
  'description',
  'age',
] as const) {}
