import { PartialType } from '@nestjs/mapped-types';
import { CreateIntakeDto } from './create-intake.dto';
import { IsDate } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateIntakeDto extends PartialType(CreateIntakeDto) {
  // Override endAt as date comparison validation does not work when startAt is not present.
  @IsDate()
  @Transform(({ value }) => new Date(value))
  endAt: Date;
}
