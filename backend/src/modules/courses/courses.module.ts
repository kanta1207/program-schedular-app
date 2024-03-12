import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';

import { Course, Program } from 'src/entity';

@Module({
  imports: [TypeOrmModule.forFeature([Course, Program])],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}
