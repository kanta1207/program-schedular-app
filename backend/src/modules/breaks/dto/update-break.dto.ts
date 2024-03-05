import { IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateBreakDto {
  @Type(() => Date)
  @IsDate()
  startAt?: Date;

  @Type(() => Date)
  @IsDate()
  // TODO: @IsAfterDate
  endAt?: Date;
}
