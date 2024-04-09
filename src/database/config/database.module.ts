import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSource } from './database.config';
import { UserEntity } from '../../entities/user/user.entity';
import { AccountActivationEntity } from 'src/entities/user/account_activation.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot(dataSource.options),
    TypeOrmModule.forFeature([UserEntity, AccountActivationEntity]),
  ],
})
export class DatabaseModule {}
