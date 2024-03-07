import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateInstructorDto } from './dto/create-instructor.dto';
import { UpdateInstructorDto } from './dto/update-instructor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Instructor } from 'src/entity/instructors.entity';
import { In, Repository } from 'typeorm';
import { CoursesInstructors } from 'src/entity/coursesInstructors.entity';
import { MasterContractType } from 'src/entity/masterContractTypes.entity';
import { MasterWeekdaysRange } from 'src/entity/masterWeekdaysRanges.entity';
import { MasterPeriodOfDay } from 'src/entity/masterPeriodOfDays.entity';
import { InstructorsPeriodOfDays } from 'src/entity/instructorsPeriodOfDays.entity';
import { Course } from 'src/entity/courses.entity';

@Injectable()
export class InstructorsService {
  constructor(
    @InjectRepository(Instructor)
    private readonly instructorRepository: Repository<Instructor>,
    @InjectRepository(MasterContractType)
    private readonly masterContractTypeRepository: Repository<MasterContractType>,
    @InjectRepository(MasterWeekdaysRange)
    private readonly masterWeekdaysRangeRepository: Repository<MasterWeekdaysRange>,
    @InjectRepository(MasterPeriodOfDay)
    private readonly masterPeriodOfDayRepository: Repository<MasterPeriodOfDay>,
    @InjectRepository(InstructorsPeriodOfDays)
    private readonly instructorsPeriodOfDaysRepository: Repository<InstructorsPeriodOfDays>,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(CoursesInstructors)
    private readonly coursesInstructorsRepository: Repository<CoursesInstructors>,
  ) {}

  async create(createInstructorDto: CreateInstructorDto) {
    const {
      desiredWorkingHours,
      contractTypeId,
      weekdaysRangeId,
      courseIds,
      periodOfDaysIds,
      ...restOfDtoProps
    } = createInstructorDto;

    const contractType = await this.masterContractTypeRepository.findOne({
      where: { id: contractTypeId },
    });

    // Validate contractor's desired working hours, making it sure it's not empty
    if (contractType.id === 3 && !desiredWorkingHours)
      throw new BadRequestException(
        'Desired working hours is required for contract instructors',
      );

    // Validate full-time or part-time instructor's desired working hours, making it sure it's empty
    if (contractType.id !== 3 && desiredWorkingHours)
      throw new BadRequestException(
        'Desired working hours should not be provided for full-time or part-time instructors',
      );

    const weekdaysRange = await this.masterWeekdaysRangeRepository.findOne({
      where: { id: weekdaysRangeId },
    });

    // save instructor and get the saved instructor data
    const instructor = await this.instructorRepository.save({
      ...restOfDtoProps,
      desiredWorkingHours,
      contractType,
      weekdaysRange,
    });

    // Save period of days and instructors relationship
    for (let i = 0; i < periodOfDaysIds.length; i++) {
      const periodOfDay = await this.masterPeriodOfDayRepository.findOne({
        where: { id: periodOfDaysIds[i] },
      });

      await this.instructorsPeriodOfDaysRepository.save({
        instructor,
        periodOfDay,
      });
    }

    // Save courses and instructors relationship
    for (let i = 0; i < courseIds.length; i++) {
      const course = await this.courseRepository.findOne({
        where: { id: courseIds[i] },
      });

      await this.coursesInstructorsRepository.save({
        instructor,
        course,
      });
    }

    return instructor;
  }

  async findAll(rangeId: number | undefined, courseId: number | undefined) {
    let instructorIds = [];

    // If courseId is provided, get all instructorsId for that course and add them to instructorIds
    if (courseId) {
      const coursesInstructors = await this.coursesInstructorsRepository.find({
        where: {
          course: { id: courseId },
        },
        relations: { instructor: true },
      });

      instructorIds = coursesInstructors.map((ci) => ci.instructor.id);
    }

    return await this.instructorRepository.find({
      where: {
        id: instructorIds.length > 0 ? In(instructorIds) : undefined,
        weekdaysRange: rangeId ? { id: rangeId } : undefined,
      },
      relations: {
        contractType: true,
        weekdaysRange: true,
        periodOfDays: true,
      },
    });
  }

  async findOne(id: number) {
    const instructor = await this.instructorRepository.findOne({
      where: {
        id,
      },
      relations: {
        contractType: true,
        weekdaysRange: true,
        periodOfDays: true,
        classes: {
          course: true,
          cohort: {
            program: true,
          },
          weekdaysRange: true,
          classroom: true,
        },
      },
    });
    // Get all the courses associated with the instructor
    const coursesInstructors = await this.coursesInstructorsRepository.find({
      where: {
        instructor: { id },
      },
      relations: { course: true },
    });
    const courses = coursesInstructors.map((ci) => ci.course);

    // Add the courses to the result object
    const result = { ...instructor, courses };

    return result;
  }

  update(id: number, updateInstructorDto: UpdateInstructorDto) {
    return `This action updates a #${id} instructor`;
  }

  remove(id: number) {
    return `This action removes a #${id} instructor`;
  }
}
