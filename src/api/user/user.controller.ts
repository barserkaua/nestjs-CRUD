import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from '../../entities/user/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Getting all users' })
  @ApiResponse({
    status: 200,
    type: [UserEntity],
  })
  @Get()
  async findAll(): Promise<UserEntity[]> {
    return this.userService.findAll();
  }

  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiOperation({ summary: 'Getting one user' })
  @ApiResponse({
    status: 200,
    type: UserEntity,
  })
  @Get(':id')
  async findOne(@Param() { id }: { id: string }): Promise<UserEntity> {
    return this.userService.findOne(id);
  }

  @ApiOperation({ summary: 'Create the user' })
  @ApiResponse({
    status: 200,
    type: UserEntity,
  })
  @Post('create')
  async create(@Body() body: CreateUserDto): Promise<UserEntity> {
    return this.userService.create(body);
  }

  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiOperation({
    summary: 'Update the user',
    description: 'Update the user by id',
  })
  @ApiResponse({
    status: 200,
    type: UserEntity,
  })
  @Patch('update/:id')
  async update(
    @Param() { id }: { id: string },
    @Body() body: UpdateUserDto,
  ): Promise<UserEntity> {
    return this.userService.update(id, body);
  }

  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiOperation({ summary: 'Delete the user' })
  @ApiResponse({
    status: 200,
    type: UserEntity,
  })
  @Delete(':id')
  async delete(@Param() { id }: { id: string }): Promise<void> {
    return this.userService.delete(id);
  }
}
