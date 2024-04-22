import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { Public } from '../../decorators/public.decorator';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from '../user/entities/user.entity';
import { SignUpDto } from './dto/sign-up.dto';

@Public()
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Sign up new user' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserEntity,
  })
  @Post('sign-up')
  async create(@Body() body: SignUpDto): Promise<UserEntity> {
    return this.authService.signUp(body);
  }

  @ApiOperation({ summary: 'Login the user' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: Object,
  })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() body: SignInDto) {
    const { email, password } = body;

    return this.authService.signIn(email, password);
  }
}
