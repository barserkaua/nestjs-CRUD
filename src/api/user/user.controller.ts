import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Getting all users' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: [UserEntity],
  })
  @Get()
  async findAll(): Promise<UserEntity[]> {
    return this.userService.findAll();
  }

  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiOperation({ summary: 'Getting one user' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserEntity,
  })
  @Get(':id')
  async findOne(@Param() { id }: { id: string }): Promise<UserEntity> {
    return this.userService.findOne(id);
  }

  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiOperation({
    summary: 'Update the user',
    description: 'Update the user by id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
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
    status: HttpStatus.OK,
    type: UserEntity,
  })
  @Delete(':id')
  async delete(@Param() { id }: { id: string }): Promise<void> {
    return this.userService.delete(id);
  }
}
