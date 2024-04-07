import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { IsEmail, IsNumber, IsString } from 'class-validator';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
  @Column()
  userName: string;

  @IsNumber()
  @Column({ nullable: true })
  age: number;

  @IsString()
  @Column({ nullable: true })
  firstName: string;

  @IsString()
  @Column({ nullable: true })
  lastName: string;

  @IsEmail()
  @Column({ nullable: true, unique: true })
  email: string;

  @IsString()
  @Column({ nullable: true })
  password: string;

  @IsString()
  @Column({ nullable: true })
  company: string;

  @IsString()
  @Column({ nullable: true })
  description: string;

  @IsString()
  @Column({ nullable: true })
  role: string;

  @IsString()
  @Column({ nullable: true })
  address: string;

  @IsString()
  @Column({ nullable: true })
  phone: string;

  @IsString()
  @Column({ nullable: true })
  avatar: string;

  @IsString()
  @Column({ nullable: true })
  resetPasswordToken: string;
}
