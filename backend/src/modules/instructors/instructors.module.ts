import { Module } from '@nestjs/common';
import { InstructorsService } from './instructors.service';
import { InstructorsController } from './instructors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Instructor,
  CoursesInstructors,
  MasterContractType,
  MasterWeekdaysRange,
  MasterPeriodOfDay,
  InstructorsPeriodOfDays,
  Course,
} from '../../entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Instructor,
      Course,
      MasterContractType,
      MasterWeekdaysRange,
      MasterPeriodOfDay,
      CoursesInstructors,
      InstructorsPeriodOfDays,
    ]),
  ],
  controllers: [InstructorsController],
  providers: [InstructorsService],
})
export class InstructorsModule {}
