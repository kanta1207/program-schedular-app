import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';
export class GetAssignedHoursDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  year: number;
}
