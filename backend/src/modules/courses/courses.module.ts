import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from 'src/entity/courses.entity';
import { Program } from 'src/entity/programs.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Course, Program])],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}
