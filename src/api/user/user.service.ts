import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user/user.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { uuid } from 'src/utils/ids.util';
import { AccountActivationEntity } from 'src/entities/user/account_activation.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    private readonly dataSource: DataSource,
  ) {}

  async create(user: CreateUserDto): Promise<UserEntity> {
    return this.dataSource.transaction(async (manager) => {
      const newUser = await manager.save(UserEntity, user);

      const activationCode = uuid();

      await manager.save(AccountActivationEntity, {
        userId: newUser.id,
        activationCode,
      });

      return newUser;
    });
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
