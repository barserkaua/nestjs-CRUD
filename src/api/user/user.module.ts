import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '../../guards/auth/auth.guard';
import { S3Module } from 'src/database/services/s3.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), S3Module],
  controllers: [UserController],
  providers: [UserService, { provide: APP_GUARD, useClass: AuthGuard }],
  exports: [UserService],
})
export class UserModule {}
