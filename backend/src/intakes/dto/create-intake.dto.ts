import { IsString, IsNotEmpty, IsDateString, MaxLength } from 'class-validator';
import { IsAfterDate } from 'src/common/validator/is-after-date';

export class CreateIntakeDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsDateString()
  startAt: Date;

  @IsDateString()
  @IsAfterDate<CreateIntakeDto>('startAt')
  endAt: Date;
}
