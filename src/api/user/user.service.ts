import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(user: CreateUserDto): Promise<UserEntity> {
    return this.userRepository.save(user);
  }

  async update(id: string, user: UpdateUserDto): Promise<UserEntity> {
    await this.userRepository.update(id, user);
    return this.findOne(id);
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  async findOne(id: string): Promise<UserEntity> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }
}
