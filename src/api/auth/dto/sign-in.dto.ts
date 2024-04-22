import { PickType } from '@nestjs/swagger';
import { UserEntity } from '../../user/entities/user.entity';

export class SignInDto extends PickType(UserEntity, [
  'email',
  'password',
] as const) {}
