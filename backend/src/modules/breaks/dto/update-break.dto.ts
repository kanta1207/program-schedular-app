import { PartialType } from '@nestjs/mapped-types';
import { IsDate } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateBreakDto } from './create-break.dto';

export class UpdateBreakDto extends PartialType(CreateBreakDto) {
  @Type(() => Date)
  @IsDate()
  endAt?: Date;
}
