import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from 'src/entities/user/user.entity';
import { ParamID } from 'src/database/dto/param-id.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<UserEntity[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param() { id }: ParamID): Promise<UserEntity> {
    return this.userService.findOne(id);
  }

  @Post('create')
  async create(@Body() body: CreateUserDto): Promise<UserEntity> {
    return this.userService.create(body);
  }

  @Post('update/:id')
  async update(
    @Param() { id }: ParamID,
    @Body() body: UpdateUserDto,
  ): Promise<UserEntity> {
    return this.userService.update(id, body);
  }

  @Delete(':id')
  async delete(@Param() { id }: ParamID): Promise<void> {
    return this.userService.delete(id);
  }
}
