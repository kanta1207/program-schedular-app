import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateCohortDto } from './dto/create-cohort.dto';
import { UpdateCohortDto } from './dto/update-cohort.dto';
import { UpdateClassesDto } from './dto/update-classes.dto';

import { Cohort, Intake, MasterPeriodOfDay, Program, Class } from 'src/entity';
import { FormattedClass } from './types';

import {
  checkInstructorTeachableCourse,
  checkSpanningAssignmentOfInstructor,
  checkClassOverlapAllowed,
  checkInstructorExceedsMaxHours,
} from '../../common/validator';

@Injectable()
export class CohortsService {
  constructor(
    @InjectRepository(Cohort)
    private readonly cohortRepository: Repository<Cohort>,
    @InjectRepository(Intake)
    private readonly intakeRepository: Repository<Intake>,
    @InjectRepository(MasterPeriodOfDay)
    private readonly periodOfDayRepository: Repository<MasterPeriodOfDay>,
    @InjectRepository(Program)
    private readonly programRepository: Repository<Program>,
    @InjectRepository(Class)
    private readonly classRepository: Repository<Class>,
  ) {}

  async create(createCohortDto: CreateCohortDto) {
    const { name, intakeId, periodOfDayId, programId } = createCohortDto;

    const [intake, periodOfDay, program] = await Promise.all([
      this.intakeRepository.findOneBy({ id: intakeId }),
      this.periodOfDayRepository.findOneBy({ id: periodOfDayId }),
      this.programRepository.findOneBy({ id: programId }),
    ]);

    const cohort = this.cohortRepository.create({
      name,
      intake,
      periodOfDay,
      program,
    });

    return await this.cohortRepository.save(cohort);
  }

  async findAll() {
    return await this.cohortRepository.find({
      order: {
        intake: { startAt: 'DESC' },
        classes: { startAt: 'ASC', endAt: 'ASC' },
        id: 'DESC',
      },
      relations: {
        intake: true,
        program: true,
        periodOfDay: true,
        classes: {
          cohort: true,
          weekdaysRange: true,
          course: true,
          classroom: true,
          instructor: true,
        },
      },
    });
  }

  async findOne(id: number) {
    const cohort = await this.cohortRepository.findOne({
      where: { id },
      order: {
        classes: { startAt: 'ASC', endAt: 'ASC' },
      },
      relations: {
        intake: true,
        program: true,
        periodOfDay: true,
        classes: {
          cohort: true,
          weekdaysRange: true,
          course: true,
          classroom: true,
          instructor: {
            contractType: true,
            classes: {
              cohort: {
                periodOfDay: true,
              },
              weekdaysRange: true,
              course: true,
            },
            courses: { course: true },
          },
        },
      },
    });
    if (!cohort) {
      throw new NotFoundException('Cohort Not Found');
    }

    let formattedClasses: FormattedClass[] = cohort.classes.map((clazz) => {
      const { instructor } = clazz;
      const instructorMessages: string[] = [];

      if (instructor) {
        const msgIsActive = this.checkInstructorIsActive(instructor.isActive);
        if (msgIsActive) {
          instructorMessages.push(msgIsActive);
        }

        const msgExceedsMaxHours = checkInstructorExceedsMaxHours(
          instructor.contractType.maxHours,
          instructor.classes,
          clazz.startAt,
          clazz.endAt,
        );

        if (msgExceedsMaxHours) {
          instructorMessages.push(msgExceedsMaxHours);
        }
        const msgSpanningAssignment = checkSpanningAssignmentOfInstructor(
          cohort.periodOfDay.id,
          clazz.startAt,
          clazz.endAt,
          instructor.classes,
        );
        if (msgSpanningAssignment) {
          instructorMessages.push(msgSpanningAssignment);
        }
        const courses = instructor.courses.map(
          (instructorCourse) => instructorCourse.course,
        );
        const msgTeachableCourse = checkInstructorTeachableCourse(
          courses,
          clazz.course.id,
        );

        if (msgTeachableCourse) {
          instructorMessages.push(msgTeachableCourse);
        }
      }

      return {
        startAt: clazz.startAt,
        endAt: clazz.endAt,
        cohort: clazz.cohort,
        course: clazz.course,
        weekdaysRange: {
          data: clazz.weekdaysRange,
          messages: [],
        },
        classroom: {
          data: clazz.classroom,
          messages: [],
        },
        instructor: {
          data: { ...instructor, classes: undefined, contractType: undefined },
          messages: instructorMessages,
        },
      };
    });

    formattedClasses = checkClassOverlapAllowed(formattedClasses);

    const formattedResponse = {
      ...cohort,
      classes: formattedClasses,
    };

    return formattedResponse;
  }

  async update(id: number, updateCohortDto: UpdateCohortDto) {
    const cohort = await this.cohortRepository.findOneBy({ id });
    if (!cohort) {
      throw new NotFoundException(`Cohort with ID "${id}" not found`);
    }

    const { name, intakeId, periodOfDayId, programId } = updateCohortDto;

    if (name) {
      cohort.name = name;
    }

    if (intakeId) {
      const intake = await this.intakeRepository.findOneBy({ id: intakeId });
      if (!intake) {
        throw new NotFoundException('Intake Not Found');
      }
      cohort.intake = intake;
    }

    if (periodOfDayId) {
      const periodOfDay = await this.periodOfDayRepository.findOneBy({
        id: periodOfDayId,
      });
      if (!periodOfDay) {
        throw new NotFoundException('PeriodOfDay Not Found');
      }
      cohort.periodOfDay = periodOfDay;
    }

    if (programId) {
      const program = await this.programRepository.findOneBy({ id: programId });
      if (!program) {
        throw new NotFoundException(`Program Not Found`);
      }
      cohort.program = program;
    }

    await this.cohortRepository.save(cohort);

    return cohort;
  }

  async remove(id: number) {
    await this.cohortRepository.delete(id);
  }

  async updateClasses(id: number, updateClassesDto: UpdateClassesDto) {
    const cohort = await this.cohortRepository.findOneBy({ id });
    if (!cohort) {
      throw new NotFoundException(`Cohort with ID "${id}" not found`);
    }

    const queryRunner =
      this.classRepository.manager.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.delete(Class, { cohort: { id } });

      const { classes } = updateClassesDto;

      const newClasses = classes.map((clazz) => {
        const {
          startAt,
          endAt,
          weekdaysRangeId,
          courseId,
          classroomId,
          instructorId,
        } = clazz;

        return this.classRepository.create({
          startAt,
          endAt,
          weekdaysRange: { id: weekdaysRangeId },
          course: { id: courseId },
          classroom: { id: classroomId },
          instructor: { id: instructorId },
          cohort,
        });
      });

      await queryRunner.manager.save(newClasses);
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException(error.message);
    } finally {
      queryRunner.release();
    }
    return await this.classRepository.find({
      where: { cohort: { id } },
      relations: {
        cohort: true,
        weekdaysRange: true,
        course: true,
        classroom: true,
        instructor: true,
      },
      order: {
        startAt: 'ASC',
        endAt: 'ASC',
      },
    });
  }

  checkInstructorIsActive(isActive: boolean): string | null {
    if (!isActive) {
      return 'Instructor is not active';
    }
    return null;
  }
}
