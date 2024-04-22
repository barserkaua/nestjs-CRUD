import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { UserEntity } from '../user/entities/user.entity';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const user = {
        email: 'johnsnow3142@gmail.com',
      } as SignUpDto;

      const createdUser = {
        id: '94423239-3122-46fb-8f54-ed86aa2ee0f6',
        email: 'johnsnow3142@gmail.com',
      } as UserEntity;

      jest.spyOn(authService, 'signUp').mockResolvedValue(createdUser);

      expect(await controller.create(user)).toBe(createdUser);
    });
  });
});
