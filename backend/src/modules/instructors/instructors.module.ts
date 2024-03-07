import { Module } from '@nestjs/common';
import { InstructorsService } from './instructors.service';
import { InstructorsController } from './instructors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Instructor } from 'src/entity/instructors.entity';
import { CoursesInstructors } from 'src/entity/coursesInstructors.entity';
import { MasterContractType } from 'src/entity/masterContractTypes.entity';
import { MasterWeekdaysRange } from 'src/entity/masterWeekdaysRanges.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Instructor,
      MasterContractType,
      MasterWeekdaysRange,
      CoursesInstructors,
    ]),
  ],
  controllers: [InstructorsController],
  providers: [InstructorsService],
})
export class InstructorsModule {}
