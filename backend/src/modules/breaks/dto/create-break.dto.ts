import { IsDate } from 'class-validator';
import { Type } from 'class-transformer';
import { IsAfterDate } from '../../../common/validator/is-after-date';

export class CreateBreakDto {
  @Type(() => Date)
  @IsDate()
  startAt: Date;

  @Type(() => Date)
  @IsDate()
  @IsAfterDate<CreateBreakDto>('startAt')
  endAt: Date;
}
