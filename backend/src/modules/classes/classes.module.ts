import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassesService } from './classes.service';
import { ClassesController } from './classes.controller';
import { Cohort } from 'src/entity/cohorts.entity';
import { Instructor } from 'src/entity/instructors.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cohort, Instructor])],
  controllers: [ClassesController],
  providers: [ClassesService],
})
export class ClassesModule {}
