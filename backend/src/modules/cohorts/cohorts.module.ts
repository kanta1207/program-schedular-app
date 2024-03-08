import { Module } from '@nestjs/common';
import { CohortsService } from './cohorts.service';
import { CohortsController } from './cohorts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cohort } from '../../entity/cohorts.entity';
import { Intake } from '../../entity/intakes.entity';
import { MasterPeriodOfDay } from '../../entity/masterPeriodOfDays.entity';
import { Program } from '../../entity/programs.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cohort, Intake, MasterPeriodOfDay, Program]),
  ],
  controllers: [CohortsController],
  providers: [CohortsService],
})
export class CohortsModule {}
