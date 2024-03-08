import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateCohortDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsNumber()
  @Min(1)
  intakeId: number;

  @IsNumber()
  @Min(1)
  periodOfDayId: number;

  @IsNumber()
  @Min(1)
  programId: number;
}
