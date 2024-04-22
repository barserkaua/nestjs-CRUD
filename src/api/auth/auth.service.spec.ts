import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { ForbiddenException, UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let userRepository: Repository<UserEntity>;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(UserEntity),
          useClass: Repository,
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn().mockResolvedValue('mockedToken'),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('signIn', () => {
    it('should return access token when valid email and password are provided', async () => {
      const user = {
        id: '1',
        email: 'test@example.com',
        password: 'hashedPassword',
      } as UserEntity;

      const { password, ...restUser } = user;

      jest.spyOn(userRepository, 'findOneBy').mockResolvedValueOnce(user);

      const expectedPayload = { sub: user.id, email: user.email };

      const result = await service.signIn(user.email, password);

      expect(userRepository.findOneBy).toHaveBeenCalledWith({
        email: user.email,
        password,
      });
      expect(jwtService.signAsync).toHaveBeenCalledWith(expectedPayload);
      expect(result).toEqual({ access_token: 'mockedToken' });
    });

    it('should throw UnauthorizedException when invalid email or password are provided', async () => {
      const email = 'test@example.com';
      const password = 'password';

      jest.spyOn(userRepository, 'findOneBy').mockResolvedValueOnce(null);

      await expect(service.signIn(email, password)).rejects.toThrow(
        UnauthorizedException,
      );
      expect(userRepository.findOneBy).toHaveBeenCalledWith({
        email,
        password: 'hashedPassword',
      });
      expect(jwtService.signAsync).not.toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const user = {
        email: 'johnsnow3142@gmail.com',
      } as UserEntity;

      const existingUser = null; // Mock the existing user

      userRepository.findOne = jest.fn().mockResolvedValue(existingUser);
      userRepository.save = jest.fn().mockResolvedValue(user);

      await service.signUp(user);

      const savedUser = await userRepository.save(user);

      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { email: user.email },
      });
      expect(userRepository.save).toHaveBeenCalledWith(user);

      expect(savedUser).toEqual(user);
    });

    it('should throw ForbiddenException if user email already exists', async () => {
      const user = {
        email: 'test@example.com',
      };

      const existingUser = {
        id: 'existing-user-id',
        email: 'test@example.com',
      };

      userRepository.findOne = jest.fn().mockResolvedValue(existingUser);

      await expect(service.signUp(user as UserEntity)).rejects.toThrowError(
        ForbiddenException,
      );
    });
  });
});
