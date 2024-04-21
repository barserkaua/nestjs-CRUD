import { PickType } from '@nestjs/swagger';
import { UserEntity } from '../../../entities/user/user.entity';

export class CreateUserDto extends PickType(UserEntity, [
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
  'createdBy',
  'lastChangedBy',
] as const) {}
