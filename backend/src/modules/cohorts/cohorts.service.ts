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
  MasterWeekdaysRange,
} from 'src/entity';
import { FormattedClass } from './types';

import {
  checkInstructorTeachableCourse,
  checkSpanningAssignmentOfInstructor,
  checkClassOverlapAllowed,
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

        const msgExceedsMaxHours = this.checkInstructorExceedsMaxHours(
          instructor.contractType.maxHours,
          instructor.classes,
          clazz.startAt,
          clazz.endAt,
          clazz.weekdaysRange,
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

  /**
   * @param maxHoursOfInstructor - Maximum hours the instructor can be assigned to
   * @param classesOfInstructor - Classes the instructor is already assigned to
   * @param startAtOfNewClass - Start date of the new class
   * @param endAtOfNewClass - End date of the new class
   * @param weekdaysRangeOfNewClass - Weekdays range of the new class
   * @returns An alert message when the instructor will exceed the maximum hours if assigned to the new class
   */
  checkInstructorExceedsMaxHours(
    maxHoursOfInstructor: number | null,
    classesOfInstructor: Class[],
    startAtOfNewClass: Date,
    endAtOfNewClass: Date,
    weekdaysRangeOfNewClass: MasterWeekdaysRange,
  ): string | null {
    if (maxHoursOfInstructor) {
      // Sort all classes by their start date
      const sortedClasses = classesOfInstructor.sort(
        (a, b) => a.startAt.getTime() - b.startAt.getTime(),
      );

      const overlaps: {
        overlapStartAt: Date;
        overlapEndAt: Date;
        totalWeeklyHours: number;
        overlappingCohortNames: string[];
      }[] = [];

      sortedClasses.forEach((currentClass) => {
        const currentCohortName = currentClass.cohort.name;
        // Weekly hours of the class is 20 if the weekdays range is Monday to Friday, otherwise 10
        const weeklyHoursOfCurrentClass =
          currentClass.weekdaysRange.id === MON_FRI_WEEKDAYS_RANGE_ID ? 20 : 10;
        // Find the overlapping group for the current class
        let found = false;
        for (let i = 0; i < overlaps.length; i++) {
          // If the currentClass overlaps with the existing overlap group
          if (
            currentClass.startAt <= overlaps[i].overlapEndAt &&
            currentClass.endAt >= overlaps[i].overlapStartAt
          ) {
            // Update the overlap period if needed
            overlaps[i].overlapStartAt = new Date(
              Math.min(
                overlaps[i].overlapStartAt.getTime(),
                currentClass.startAt.getTime(),
              ),
            );
            overlaps[i].overlapEndAt = new Date(
              Math.max(
                overlaps[i].overlapEndAt.getTime(),
                currentClass.endAt.getTime(),
              ),
            );
            // Update the total hours of the overlap group
            overlaps[i].totalWeeklyHours += weeklyHoursOfCurrentClass;
            /**
             * Add the cohort name to the overlapping group
             * There is a change that instructor has two different classes with the same cohort in the same duration,
             * when they are MON-WED and WED-FRI classes.
             * In those cases, the cohort name should be added only once.
             */
            if (
              !overlaps[i].overlappingCohortNames.includes(currentCohortName)
            ) {
              overlaps[i].overlappingCohortNames.push(currentCohortName);
            }
            found = true;
            break;
          }
        }

        // If no overlapping group is found, create a new one
        if (!found) {
          overlaps.push({
            overlapStartAt: currentClass.startAt,
            overlapEndAt: currentClass.endAt,
            totalWeeklyHours: weeklyHoursOfCurrentClass,
            overlappingCohortNames: [currentCohortName],
          });
        }
      });

      // Check if the new class overlaps with any of the existing classes
      for (const overlap of overlaps) {
        if (
          startAtOfNewClass <= overlap.overlapEndAt &&
          endAtOfNewClass >= overlap.overlapStartAt
        ) {
          // Weekly hours of the class is 20 if the weekdays range is Monday to Friday, otherwise 10
          const weeklyHoursOfNewClass =
            weekdaysRangeOfNewClass.id === MON_FRI_WEEKDAYS_RANGE_ID ? 20 : 10;
          const totalWeeklyHoursInstructorAssigned =
            overlap.totalWeeklyHours + weeklyHoursOfNewClass;
          if (totalWeeklyHoursInstructorAssigned > maxHoursOfInstructor) {
            return `Instructor will exceed maximum hours if assigned to this class. Overlapping cohort(s): ${overlap.overlappingCohortNames.join(
              ', ',
            )} Total weekly working hours will be ${totalWeeklyHoursInstructorAssigned} from ${dayjs(overlap.overlapStartAt).format('YYYY-MM-DD')} to ${dayjs(overlap.overlapEndAt).format('YYYY-MM-DD')}. Instructor's maximum weekly working hour is ${maxHoursOfInstructor}.`;
          }
        }
      }
    }
    return null;
  }
}
