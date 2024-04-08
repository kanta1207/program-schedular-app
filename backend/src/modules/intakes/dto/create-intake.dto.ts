import { Transform } from 'class-transformer';
import { IsString, IsNotEmpty, MaxLength, IsDate } from 'class-validator';
import { IsAfterDate } from '../../../common/validator/is-after-date';

export class CreateIntakeDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  startAt: Date;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  @IsAfterDate<CreateIntakeDto>('startAt')
  endAt: Date;
}
