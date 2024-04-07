import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class ParamID {
  @ApiProperty({ example: '94423239-3122-46fb-8f54-ed86aa2ee0f6' })
  @IsNumber()
  id: string;
}
