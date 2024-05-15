import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/config/database.module';
import { UserModule } from './api/user/user.module';
import { AuthModule } from './api/auth/auth.module';
import { S3Module } from './database/services/s3.module';
@Module({
  imports: [DatabaseModule, AuthModule, UserModule, S3Module],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
