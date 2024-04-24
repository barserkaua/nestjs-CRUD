import { Column, Entity, OneToOne } from 'typeorm';
import { BaseEntity } from '../../../database/entities/base.entity';
import { IsEmail, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AccountActivationEntity } from './account_activation.entity';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
  @ApiProperty({ example: 'Vaider' })
  @IsString()
  @Column()
  userName: string;

  @ApiProperty({ example: 30 })
  @IsNumber()
  @Column({ nullable: true })
  age: number;

  @ApiProperty({ example: 'John' })
  @IsString()
  @Column()
  firstName: string;

  @ApiProperty({ example: 'Snow' })
  @IsString()
  @Column()
  lastName: string;

  @ApiProperty({ example: 'johnsnow@gmail.com' })
  @IsEmail()
  @Column({ unique: true })
  email: string;

  @ApiProperty({ example: 'JohnSnowPassword123' })
  @IsString()
  @Column({ select: false, nullable: true })
  password: string;

  @ApiProperty({ example: 'The Wall' })
  @IsString()
  @Column({ nullable: true })
  company: string;

  @ApiProperty({ example: "I'm the Ned Stark bastard son" })
  @IsString()
  @Column({ nullable: true })
  description: string;

  @ApiProperty({ example: 'Lord Commandor' })
  @IsString()
  @Column({ nullable: true })
  role: string;

  @ApiProperty({ example: 'Winterfell' })
  @IsString()
  @Column({ nullable: true })
  address: string;

  @ApiProperty({ example: '+1342318323' })
  @IsString()
  @Column({ nullable: true })
  phone: string;

  @ApiProperty({ example: 'image/example.png' })
  @IsString()
  @Column({ nullable: true })
  avatar: string;

  @ApiProperty({ example: 'dsa214sakfa2k1SDD2dkadsa' })
  @IsString()
  @Column({ nullable: true })
  resetPasswordToken: string;

  @OneToOne(() => AccountActivationEntity, (data) => data.user)
  accountActivation: AccountActivationEntity;
}

export type UserEntityRelations = Pick<UserEntity, 'accountActivation'>;
