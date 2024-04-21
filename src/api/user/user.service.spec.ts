import { Test, TestingModule } from '@nestjs/testing';

import { getRepositoryToken } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from '../../entities/user/user.entity';
import { ForbiddenException } from '@nestjs/common';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useClass: Repository,
        },
        {
          provide: DataSource,
          useValue: {
            transaction: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const user = {
        email: 'johnsnow3142@gmail.com',
      } as UserEntity;

      const existingUser = null; // Mock the existing user

      userRepository.findOne = jest.fn().mockResolvedValue(existingUser);
      userRepository.save = jest.fn().mockResolvedValue(user);

      await service.create(user);

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

      await expect(service.create(user as UserEntity)).rejects.toThrowError(
        ForbiddenException,
      );
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const id = 'user-id';
      const user = {} as UserEntity;

      userRepository.update = jest.fn().mockResolvedValue(undefined);
      service.findOne = jest.fn().mockResolvedValue(user);

      const result = await service.update(id, user);

      expect(userRepository.update).toHaveBeenCalledWith(id, user);
      expect(service.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(user);
    });
  });

  describe('delete', () => {
    it('should delete a user', async () => {
      const id = 'user-id';

      userRepository.delete = jest.fn().mockResolvedValue(undefined);

      await service.delete(id);

      expect(userRepository.delete).toHaveBeenCalledWith(id);
    });
  });

  describe('findOne', () => {
    it('should find a user by id', async () => {
      const id = 'user-id';
      const user = {};

      userRepository.findOne = jest.fn().mockResolvedValue(user);

      const result = await service.findOne(id);

      expect(userRepository.findOne).toHaveBeenCalledWith({ where: { id } });
      expect(result).toEqual(user);
    });
  });

  describe('findAll', () => {
    it('should find all users', async () => {
      const users = [{}];

      userRepository.find = jest.fn().mockResolvedValue(users);

      const result = await service.findAll();

      expect(userRepository.find).toHaveBeenCalled();
      expect(result).toEqual(users);
    });
  });
});
