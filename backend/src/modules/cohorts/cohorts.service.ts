import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as dayjs from 'dayjs';

import { CreateCohortDto } from './dto/create-cohort.dto';
import { UpdateCohortDto } from './dto/update-cohort.dto';
import { UpdateClassesDto } from './dto/update-classes.dto';

import {
  Cohort,
  Intake,
  MasterPeriodOfDay,
  Program,
  Class,
  Instructor,
} from 'src/entity';
import { FormattedClass } from './types';
import {
  // WEEKDAYS_RANGE_MON_FRI,
  WEEKDAYS_RANGE_MON_WED,
  WEEKDAYS_RANGE_WED_FRI,
} from './cohorts.constant';

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
    @InjectRepository(Instructor)
    private readonly instructorRepository: Repository<Instructor>,
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
          instructor: true,
        },
      },
    });
    if (!cohort) {
      throw new NotFoundException('Cohort Not Found');
    }

    const formattedClasses: FormattedClass[] = cohort.classes.map((clazz) => {
      const { instructor } = clazz;
      const instructorMessages: string[] = [];

      if (instructor) {
        const msgIsActive = this.checkInstructorIsActive(instructor);
        if (msgIsActive) {
          instructorMessages.push(msgIsActive);
        }
      }

      return {
        startAt: clazz.startAt,
        endAt: clazz.endAt,
        cohort: clazz.cohort,
        course: clazz.course,
        messages: [],
        weekdaysRange: {
          data: clazz.weekdaysRange,
          messages: [],
        },
        classroom: {
          data: clazz.classroom,
          messages: [],
        },
        instructor: {
          data: clazz.instructor,
          messages: instructorMessages,
        },
      };
    });

    // TODO: fix later
    const formattedClassesWithErrors = this.checkClassOverlap(formattedClasses);
    console.log(formattedClassesWithErrors);

    const formattedResponse = {
      ...cohort,
      classes: formattedClassesWithErrors,
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

  checkInstructorIsActive(instructor: Instructor): string | null {
    if (!instructor.isActive) {
      return 'Instructor is not active';
    }
    return null;
  }

  checkClassOverlap(classes: FormattedClass[]): FormattedClass[] {
    // const overlaps: FormattedClass[][] = [];

    const checkOverlapAllowed = (rangeAId: number, rangeBId: number) => {
      const allowedCombinations = [
        [WEEKDAYS_RANGE_MON_WED.id, WEEKDAYS_RANGE_WED_FRI.id],
        [WEEKDAYS_RANGE_WED_FRI.id, WEEKDAYS_RANGE_MON_WED.id],
      ];
      // Allow overlaps of [Mon-Wed, Wed-Fri] or [Wed-Fri, Mon-Wed]
      return allowedCombinations.some(
        ([a, b]) => rangeAId === a && rangeBId === b,
      );
    };

    // Compare each classes
    for (let i = 0; i < classes.length; i++) {
      for (let j = i + 1; j < classes.length; j++) {
        const classA = classes[i];
        const classB = classes[j];

        // Check duration
        if (classA.startAt <= classB.endAt && classA.endAt >= classB.startAt) {
          // Check if (Mon-Wed, Wed-Fri) or (Wed-Fri, Mon-Wed)
          const isOverlapAllowed = checkOverlapAllowed(
            classA.weekdaysRange.data.id,
            classB.weekdaysRange.data.id,
          );
          if (!isOverlapAllowed) {
            // TODO: fix  later
            // TODO: need to remove duplicate messages
            const classAStartAt = dayjs(classA.startAt).format('YYYY-MM-DD');
            const classAEndAt = dayjs(classB.startAt).format('YYYY-MM-DD');
            const classARangeName = classA.weekdaysRange.data.name;
            const classBStartAt = dayjs(classB.startAt).format('YYYY-MM-DD');
            const classBEndAt = dayjs(classB.startAt).format('YYYY-MM-DD');
            const classBRangeName = classB.weekdaysRange.data.name;

            const msgA = `Overlaps with ${classBStartAt} - ${classBEndAt}(${classBRangeName})`;
            const msgB = `Overlaps with ${classAStartAt} - ${classAEndAt}(${classARangeName})`;
            classA.messages.push(msgA);
            classB.messages.push(msgB);
            // overlaps.push([classA, classB]);
          }
        }
      }
    }

    // return overlaps;
    return classes;
  }
}
