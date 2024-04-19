import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserEntity } from '../../entities/user/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;

  const userServiceMock = {
    findAll: jest.fn().mockReturnValue([]),
    findOne: jest.fn().mockReturnValue({}),
    create: jest.fn().mockReturnValue({}),
    update: jest.fn().mockReturnValue({}),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{ provide: UserService, useValue: userServiceMock }],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users: UserEntity[] = [
        /* create some test users here */
      ];
      jest.spyOn(userService, 'findAll').mockResolvedValue(users);

      expect(await controller.findAll()).toBe(users);
    });
  });

  describe('findOne', () => {
    it('should return a user by ID', async () => {
      const userId = '1';
      const user = { id: userId } as UserEntity;
      jest.spyOn(userService, 'findOne').mockResolvedValue(user);

      expect(await controller.findOne({ id: userId })).toBe(user);
    });
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
        email: 'johnsnow3142@gmail.com',
      } as CreateUserDto;
      const createdUser: UserEntity = {
        id: '94423239-3122-46fb-8f54-ed86aa2ee0f6',
        email: 'johnsnow3142@gmail.com',
      } as UserEntity;

      jest.spyOn(userService, 'create').mockResolvedValue(createdUser);

      expect(await controller.create(createUserDto)).toBe(createdUser);
    });
  });

  describe('update', () => {
    it('should update a user by ID', async () => {
      const userId = '1';
      const updateUserDto: UpdateUserDto = {
        email: 'johnsnow3142@gmail.com',
      } as UpdateUserDto;
      const updatedUser: UserEntity = {
        id: '94423239-3122-46fb-8f54-ed86aa2ee0f6',
        email: 'johnsnow3142@gmail.com',
      } as UserEntity;
      jest.spyOn(userService, 'update').mockResolvedValue(updatedUser);

      expect(await controller.update({ id: userId }, updateUserDto)).toBe(
        updatedUser,
      );
    });
  });

  describe('delete', () => {
    it('should delete a user by ID', async () => {
      const userId = '1';
      jest.spyOn(userService, 'delete').mockResolvedValue();

      expect(await controller.delete({ id: userId })).toBeUndefined();
    });
  });
});
