import { IsNumber } from 'class-validator';

export class ParamID {
  @IsNumber()
  id: string;
}
