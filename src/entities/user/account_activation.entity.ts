import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { uuid } from 'src/utils/ids.util';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity({ name: 'account_activation' })
export class AccountActivationEntity {
  @ApiProperty({ example: 'JohnSnowPassword123' })
  @IsString()
  @PrimaryColumn()
  userId: string;

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @ApiProperty({ example: uuid() })
  @IsString()
  @Column()
  activationCode: string;
}
