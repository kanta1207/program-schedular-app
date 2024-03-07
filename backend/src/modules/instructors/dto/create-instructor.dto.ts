import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateInstructorDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;

  @IsOptional()
  @IsString()
  note: string | null;

  @IsNumber()
  @IsNotEmpty()
  desiredWorkingHours: number;

  @IsNumber()
  @IsNotEmpty()
  contractTypeId: number;

  @IsNumber()
  @IsNotEmpty()
  weekdaysRangeId: number;

  @IsArray()
  @IsNumber({}, { each: true })
  @IsNotEmpty()
  courseIds: number[];

  @IsArray()
  @IsNumber({}, { each: true })
  @IsNotEmpty()
  periodOfDaysIds: number[];
}
