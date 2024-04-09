import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
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

  @ApiProperty({ example: '2aq32c24-2d12-d43ab-bd9a-e54515366089' })
  @IsString()
  @Column()
  activationCode: string;
}
