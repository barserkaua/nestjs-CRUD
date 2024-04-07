import { ApiProperty } from '@nestjs/swagger';
import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @ApiProperty({ example: '94423239-3122-46fb-8f54-ed86aa2ee0f6' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: true })
  @Column({ type: 'boolean', default: false })
  isActive: boolean;

  @ApiProperty({ example: false })
  @Column({ type: 'boolean', default: false })
  isArchived: boolean;

  @ApiProperty({ example: '2024-04-07T10:05:50.484Z' })
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createDateTime: Date;

  @ApiProperty({ example: 'Vaider' })
  @Column({ type: 'varchar', length: 300 })
  createdBy: string;

  @ApiProperty({ example: '2024-04-07T10:05:50.484Z' })
  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  lastChangedDateTime: Date;

  @ApiProperty({ example: 'Vaider' })
  @Column({ type: 'varchar', length: 300 })
  lastChangedBy: string;
}
