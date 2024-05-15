import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiBody,
  ApiConsumes,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { User } from '../../decorators/user-param.decorator';
import { ImageFileFilter } from '../../utils/image-file-filter.util';
import { IUserPayload } from '../../types/user-payload.type';

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

  @ApiOperation({ summary: 'Upload the avatar' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserEntity,
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: ImageFileFilter,
      limits: {
        fileSize: 5024 * 1000, // 5MB
        files: 1,
      },
    }),
  )
  @Patch('upload-avatar/:id')
  async uploadAvatar(
    @User() user: IUserPayload,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<UserEntity> {
    return this.userService.uploadAvatar(user.sub, file);
  }
}
