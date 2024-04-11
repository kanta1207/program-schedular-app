import { Module } from '@nestjs/common';
import { IntakesController } from './intakes.controller';
import { IntakesService } from './intakes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Intake, MasterPeriodOfDay } from '../../entity';

@Module({
  imports: [TypeOrmModule.forFeature([Intake, MasterPeriodOfDay])],
  controllers: [IntakesController],
  providers: [IntakesService],
})
export class IntakesModule {}
