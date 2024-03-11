import { Module } from '@nestjs/common';
import { CohortsService } from './cohorts.service';
import { CohortsController } from './cohorts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  Cohort,
  Intake,
  MasterClassroom,
  MasterPeriodOfDay,
  MasterWeekdaysRange,
  Program,
  Class,
  Course,
  Instructor,
} from 'src/entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Cohort,
      Intake,
      MasterPeriodOfDay,
      MasterWeekdaysRange,
      MasterClassroom,
      Program,
      Class,
      Course,
      Instructor,
    ]),
  ],
  controllers: [CohortsController],
  providers: [CohortsService],
})
export class CohortsModule {}
