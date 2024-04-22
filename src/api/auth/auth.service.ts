import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { hash } from '../../utils/password.util';
import { SignUpDto } from './dto/sign-up.dto';
import { uuid } from '../../utils/ids.util';
import { AccountActivationEntity } from '../user/entities/account_activation.entity';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    private readonly dataSource: DataSource,
  ) {}

  async signUp(user: SignUpDto): Promise<UserEntity> {
    const existingUser = await this.userRepository.findOne({
      where: { email: user.email },
    });

    if (existingUser) {
      throw new ForbiddenException('User email already exists');
    }

    return this.dataSource.transaction(async (manager) => {
      const { password, ...restUser } = user;
      const newUser = await manager.save(UserEntity, {
        ...restUser,
        password: hash(password),
      });

      const activationCode = uuid();

      await manager.save(AccountActivationEntity, {
        userId: newUser.id,
        activationCode,
      });

      return newUser;
    });
  }

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.userRepository.findOneBy({
      email,
      password: hash(pass),
    });

    if (!user) {
      throw new ForbiddenException('User matching credentials not found');
    }

    const payload = { sub: user.id, email: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
