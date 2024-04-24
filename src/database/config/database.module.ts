import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSource } from './database.config';
import { UserEntity } from '../../api/user/entities/user.entity';
import { AccountActivationEntity } from '../../api/user/entities/account_activation.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot(dataSource.options),
    TypeOrmModule.forFeature([UserEntity, AccountActivationEntity]),
  ],
})
export class DatabaseModule {}
