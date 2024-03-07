import { Module } from '@nestjs/common';
import { InstructorsService } from './instructors.service';
import { InstructorsController } from './instructors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Instructor } from 'src/entity/instructors.entity';
import { CoursesInstructors } from 'src/entity/coursesInstructors.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Instructor, CoursesInstructors])],
  controllers: [InstructorsController],
  providers: [InstructorsService],
})
export class InstructorsModule {}
