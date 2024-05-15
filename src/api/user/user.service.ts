import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { shortID } from 'src/utils/ids.util';
import { extname } from 'path';
import { S3Service } from 'src/database/services/s3.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly s3Service: S3Service,
  ) {}

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

  async uploadAvatar(id: string, file: Express.Multer.File): Promise<any> {
    const { originalname } = file;

    const user = await this.userRepository.findOneBy({ id });

    file.originalname = shortID() + extname(originalname);

    const { Location } = await this.s3Service
      .uploadFile(file)
      .then(async (result) => {
        if (!result)
          throw new InternalServerErrorException(
            'An error occurred while file uploading',
          );

        if (user?.avatar) await this.s3Service.deleteFile(user.avatar);

        return result;
      });

    await this.userRepository.update({ id }, { avatar: file.originalname });

    return { avatar: Location };
  }
}
