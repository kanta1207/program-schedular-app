import { PartialType } from '@nestjs/mapped-types';
import { CreateIntakeDto } from './create-intake.dto';
import { IsDateString } from 'class-validator';

export class UpdateIntakeDto extends PartialType(CreateIntakeDto) {
  // Override endAt as date comparison validation does not work when startAt is not present.
  @IsDateString()
  endAt: Date;
}
