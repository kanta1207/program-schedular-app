import { Module } from '@nestjs/common';
import { CohortsService } from './cohorts.service';
import { CohortsController } from './cohorts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  Cohort,
  Intake,
  MasterPeriodOfDay,
  Program,
  Class,
  Instructor,
} from '../../entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Cohort,
      Intake,
      MasterPeriodOfDay,
      Program,
      Class,
      Instructor,
    ]),
  ],
  controllers: [CohortsController],
  providers: [CohortsService],
})
export class CohortsModule {}
