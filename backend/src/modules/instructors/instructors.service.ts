import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { CreateInstructorDto } from './dto/create-instructor.dto';
import { UpdateInstructorDto } from './dto/update-instructor.dto';

import { addHours } from '../../common/utils';

import {
  Course,
  CoursesInstructors,
  Instructor,
  InstructorsPeriodOfDays,
  MasterContractType,
  MasterPeriodOfDay,
  MasterWeekdaysRange,
} from '../../entity';

import {
  CONTRACTOR_CONTRACT_TYPE_ID,
  MON_FRI_WEEKDAYS_RANGE_ID,
  MON_WED_WEEKDAYS_RANGE_ID,
  WED_FRI_WEEKDAYS_RANGE_ID,
} from '../../common/constants/master.constant';

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
      periodOfDayIds,
      ...restOfDtoProps
    } = createInstructorDto;

    // Validate contractor's desired working hours, making it sure it's not empty
    if (contractTypeId === CONTRACTOR_CONTRACT_TYPE_ID && !desiredWorkingHours)
      throw new BadRequestException(
        'Desired working hours is required for contract instructors',
      );

    // Validate full-time or part-time instructor's desired working hours, making it sure it's empty
    if (contractTypeId !== CONTRACTOR_CONTRACT_TYPE_ID && desiredWorkingHours)
      throw new BadRequestException(
        'Desired working hours should not be provided for full-time or part-time instructors',
      );

    const contractType = await this.masterContractTypeRepository.findOne({
      where: { id: contractTypeId },
    });

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

    const periodOfDays = await this.masterPeriodOfDayRepository.find({
      where: { id: In(periodOfDayIds) },
    });
    const instructorsPeriodOfDays = periodOfDays.map((periodOfDay) => ({
      instructor,
      periodOfDay,
    }));
    await this.instructorsPeriodOfDaysRepository.save(instructorsPeriodOfDays);

    // Save courses and instructors relationship
    const courses = await this.courseRepository.find({
      where: { id: In(courseIds) },
    });
    const coursesInstructors = courses.map((course) => ({
      instructor,
      course,
    }));
    await this.coursesInstructorsRepository.save(coursesInstructors);

    return instructor;
  }

  async findAll(
    rangeId: number | undefined,
    courseId: number | undefined,
    isActive: boolean | undefined,
  ) {
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

    const instructors = await this.instructorRepository.find({
      where: {
        id: instructorIds.length > 0 ? In(instructorIds) : undefined,
        weekdaysRange: rangeId ? { id: rangeId } : undefined,
        isActive: isActive,
      },
      relations: {
        contractType: true,
        weekdaysRange: true,
        courses: {
          course: true,
        },
      },
      order: { isActive: 'DESC', id: 'DESC' },
    });

    const instructorPeriodOfDays =
      await this.instructorsPeriodOfDaysRepository.find({
        where: {
          instructor: In(instructors.map((i) => i.id)),
        },
        relations: { periodOfDay: true, instructor: true },
      });

    // Add period of days to the result object
    const result = instructors.map((instructor) => {
      const courses = instructor.courses.map((instructorCourse) => ({
        ...instructorCourse.course,
      }));
      const periodOfDays = instructorPeriodOfDays
        .filter((ipod) => ipod.instructor.id === instructor.id)
        .map((ipod) => ipod.periodOfDay);
      return { ...instructor, courses, periodOfDays };
    });

    return result;
  }

  async findWithAssignedHours(year?: number) {
    const targetYear = year || new Date().getFullYear();

    let firstDayOfYear = new Date(targetYear, 0, 1);
    const dayOfWeek = firstDayOfYear.getDay(); // Get the day of the week for 1/1 (0 = Sunday, 1 = Monday...)
    // Adjust firstDayOfYear to Monday
    if (dayOfWeek !== 1) {
      firstDayOfYear.setDate(
        firstDayOfYear.getDate() + (dayOfWeek === 0 ? 1 : 8 - dayOfWeek),
      );
    }
    firstDayOfYear = addHours(firstDayOfYear);

    // Check if the week includes days from the target year
    const firstWeekEndDate = new Date(firstDayOfYear);
    firstWeekEndDate.setDate(firstDayOfYear.getDate() + 4); // Friday of the first week

    // const endDate = new Date(targetYear + 1, 0, 1);
    const endDate = addHours(new Date(targetYear + 1, 0, 1));

    const allWeeks = []; // all weeks in 1 year
    const currentWeekStart = new Date(firstDayOfYear);
    const dayBeforeNewYear = new Date(targetYear, 0, 0); // 12/31

    // Week starts from the previous year and ends in the target year
    if (dayBeforeNewYear < firstWeekEndDate) {
      allWeeks.push({
        startAt: new Date(currentWeekStart),
        endAt: new Date(firstWeekEndDate),
      });
    }
    currentWeekStart.setDate(currentWeekStart.getDate() + 7); // Move to the next week's Monday

    while (currentWeekStart < endDate) {
      const endOfWeek = new Date(currentWeekStart);
      endOfWeek.setDate(currentWeekStart.getDate() + 4); // Set to Friday of the current week

      allWeeks.push({
        startAt: new Date(currentWeekStart),
        endAt: new Date(endOfWeek),
      });

      currentWeekStart.setDate(currentWeekStart.getDate() + 7);
    }

    const instructorsRaw = await this.instructorRepository.find({
      relations: {
        contractType: true,
        weekdaysRange: true,
        courses: {
          course: true,
        },
        classes: {
          weekdaysRange: true,
        },
      },
      order: {
        isActive: 'DESC',
        id: 'DESC',
        classes: {
          startAt: 'ASC',
        },
      },
    });

    const instructorPeriodOfDays =
      await this.instructorsPeriodOfDaysRepository.find({
        where: {
          instructor: In(instructorsRaw.map((i) => i.id)),
        },
        relations: { periodOfDay: true, instructor: true },
      });

    const instructors = instructorsRaw.map((instructor) => {
      const courses = instructor.courses.map((instructorCourse) => ({
        ...instructorCourse.course,
      }));
      const periodOfDays = instructorPeriodOfDays
        .filter((ipod) => ipod.instructor.id === instructor.id)
        .map((ipod) => ipod.periodOfDay);
      return { ...instructor, courses, periodOfDays };
    });

    const updateAssignedHours = (
      assignedHours: number,
      weekdaysRangeId: number,
    ): number => {
      switch (weekdaysRangeId) {
        case MON_FRI_WEEKDAYS_RANGE_ID:
          return assignedHours + 20;
        case MON_WED_WEEKDAYS_RANGE_ID:
          return assignedHours + 10;
        case WED_FRI_WEEKDAYS_RANGE_ID:
          return assignedHours + 10;
        default:
          return assignedHours;
      }
    };

    const instructorsAssignedHours = instructors.map((instructor) => {
      const assignedHoursForInstructor = allWeeks.map((week) => {
        const hours = instructor.classes
          .filter((clazz) => {
            return week.startAt <= clazz.endAt && week.endAt >= clazz.startAt;
          })
          .reduce(
            (totalHours, clazz) =>
              updateAssignedHours(totalHours, clazz.weekdaysRange.id),
            0,
          );

        let isOverMaximum = false;
        let isUnderMinimum = false;
        let isUnderDesired = false;
        if (instructor.desiredWorkingHours !== null) {
          isUnderDesired = hours < instructor.desiredWorkingHours;
        } else {
          isOverMaximum = instructor.contractType.maxHours < hours;
          isUnderMinimum = hours < instructor.contractType.minHours;
        }

        return {
          startAt: week.startAt,
          endAt: week.endAt,
          hours,
          isOverMaximum,
          isUnderMinimum,
          isUnderDesired,
        };
      });

      return {
        id: instructor.id,
        createdAt: instructor.createdAt,
        updatedAt: instructor.updatedAt,
        name: instructor.name,
        isActive: instructor.isActive,
        note: instructor.note,
        desiredWorkingHours: instructor.desiredWorkingHours,
        contractType: instructor.contractType,
        weekdaysRange: instructor.weekdaysRange,
        periodOfDays: instructor.periodOfDays,
        courses: instructor.courses,
        assignedHours: assignedHoursForInstructor,
      };
    });

    return instructorsAssignedHours;
  }

  async findOne(id: number) {
    const instructor = await this.instructorRepository.findOne({
      where: {
        id,
      },
      relations: {
        contractType: true,
        weekdaysRange: true,
        classes: {
          course: true,
          cohort: {
            program: true,
            periodOfDay: true,
            intake: true,
          },
          weekdaysRange: true,
          classroom: true,
        },
      },
      order: {
        classes: {
          startAt: 'ASC',
          endAt: 'ASC',
        },
      },
    });

    if (!instructor) {
      throw new NotFoundException('Instructor not found');
    }

    // Get all the period of days associated with the instructor
    const instructorsPeriodOfDays =
      await this.instructorsPeriodOfDaysRepository.find({
        where: {
          instructor: { id },
        },
        relations: { periodOfDay: true },
      });
    const periodOfDays = instructorsPeriodOfDays.map(
      (ipod) => ipod.periodOfDay,
    );

    // Get all the courses associated with the instructor
    const coursesInstructors = await this.coursesInstructorsRepository.find({
      where: {
        instructor: { id },
      },
      relations: { course: true },
    });
    const courses = coursesInstructors.map((ci) => ci.course);

    // Add the period of days and the courses to the result object
    const result = { ...instructor, periodOfDays, courses };

    return result;
  }

  async update(id: number, updateInstructorDto: UpdateInstructorDto) {
    const existingInstructor = await this.instructorRepository.findOne({
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
            periodOfDay: true,
          },
          weekdaysRange: true,
          classroom: true,
        },
      },
    });

    if (!existingInstructor) {
      throw new NotFoundException('Instructor not found');
    }

    const {
      desiredWorkingHours,
      contractTypeId,
      weekdaysRangeId,
      periodOfDayIds,
      courseIds,
      ...restOfDtoProps
    } = updateInstructorDto;

    // Validate contractor's desired working hours, making it sure it's not empty
    if (contractTypeId === CONTRACTOR_CONTRACT_TYPE_ID && !desiredWorkingHours)
      throw new BadRequestException(
        'Desired working hours is required for contract instructors',
      );

    // Validate full-time or part-time instructor's desired working hours, making it sure it's empty
    if (
      contractTypeId !== CONTRACTOR_CONTRACT_TYPE_ID &&
      existingInstructor.contractType.id !== CONTRACTOR_CONTRACT_TYPE_ID &&
      desiredWorkingHours
    )
      throw new BadRequestException(
        'Desired working hours should not be provided for full-time or part-time instructors',
      );

    const attrToUpdate: Partial<Instructor> = {
      desiredWorkingHours,
      ...restOfDtoProps,
    };

    if (contractTypeId) {
      const contractType = await this.masterContractTypeRepository.findOne({
        where: { id: contractTypeId },
      });
      attrToUpdate.contractType = contractType;
    }

    if (weekdaysRangeId) {
      const weekdaysRange = await this.masterWeekdaysRangeRepository.findOne({
        where: { id: weekdaysRangeId },
      });
      attrToUpdate.weekdaysRange = weekdaysRange;
    }

    // Update the instructor
    // Using save method instead of update method to get the updated instructor data
    await this.instructorRepository.update(id, attrToUpdate);

    // Update period of days and instructors relationship
    if (periodOfDayIds) {
      // Delete all the existing period of days and target instructors relationship
      await this.instructorsPeriodOfDaysRepository.delete({
        instructor: { id },
      });

      // Save all of the period of days and instructors relationship again
      const periodOfDays = await this.masterPeriodOfDayRepository.find({
        where: { id: In(periodOfDayIds) },
      });
      const instructorsPeriodOfDays = periodOfDays.map((periodOfDay) => ({
        instructor: { id },
        periodOfDay,
      }));
      await this.instructorsPeriodOfDaysRepository.save(
        instructorsPeriodOfDays,
      );
    }

    // Update courses and instructors relationship
    if (courseIds) {
      // Delete all the existing courses and target instructors relationship
      await this.coursesInstructorsRepository.delete({
        instructor: { id },
      });

      // Save all of the courses and instructors relationship again
      const courses = await this.courseRepository.find({
        where: { id: In(courseIds) },
      });
      const coursesInstructors = courses.map((course) => ({
        instructor: { id },
        course,
      }));
      await this.coursesInstructorsRepository.save(coursesInstructors);
    }

    // Get the updated instructor data and return it
    return await this.findOne(id);
  }

  async remove(id: number) {
    const instructor = await this.instructorRepository.findOne({
      where: {
        id,
      },
      relations: {
        classes: true,
      },
    });
    if (!instructor) {
      throw new NotFoundException('Instructor not found');
    }

    if (instructor.classes.length > 0) {
      throw new BadRequestException(
        'Cannot delete instructor who is assigned to classes',
      );
    }

    await this.instructorRepository.delete(id);
  }
}
