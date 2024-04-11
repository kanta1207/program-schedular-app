import {
  IsArray,
  IsDate,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { IsAfterDate } from '../../../common/validator/is-after-date';

class ClassDto {
  @IsDate()
  @Transform(({ value }) => new Date(value))
  startAt: Date;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  @IsAfterDate<ClassDto>('startAt')
  endAt: Date;

  @IsNumber()
  cohortId: number;

  @IsNumber()
  weekdaysRangeId: number;

  @IsNumber()
  courseId: number;

  @IsNumber()
  classroomId: number;

  @IsOptional()
  @IsNumber()
  instructorId: number;
}

export class UpdateClassesDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ClassDto)
  classes: ClassDto[];
}
