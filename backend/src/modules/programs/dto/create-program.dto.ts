import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateProgramDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;
}
