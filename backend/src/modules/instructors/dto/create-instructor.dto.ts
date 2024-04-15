import {
  ArrayMinSize,
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

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  desiredWorkingHours: number | undefined;

  @IsNumber()
  @IsNotEmpty()
  contractTypeId: number;

  @IsNumber()
  @IsNotEmpty()
  weekdaysRangeId: number;

  @IsArray()
  @IsNumber({}, { each: true })
  @IsNotEmpty()
  @ArrayMinSize(1)
  courseIds: number[];

  @IsArray()
  @IsNumber({}, { each: true })
  @IsNotEmpty()
  @ArrayMinSize(1)
  periodOfDayIds: number[];
}
