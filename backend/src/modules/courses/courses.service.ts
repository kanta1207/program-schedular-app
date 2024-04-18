import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

import { Course, Program } from '../../entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(Program)
    private readonly programRepository: Repository<Program>,
  ) {}

  async create(createCourseDto: CreateCourseDto) {
    const { name, requiredHours, programId } = createCourseDto;

    const program = await this.programRepository.findOneBy({ id: programId });
    const createdCourse = await this.courseRepository.save({
      name,
      requiredHours,
      program,
    });

    return await this.findOne(createdCourse.id);
  }

  async findAll() {
    return await this.courseRepository.find({
      order: {
        id: 'DESC',
        program: {
          cohorts: {
            id: 'DESC',
            classes: { startAt: 'ASC', endAt: 'ASC' },
          },
          courses: { id: 'DESC' },
        },
      },
      relations: {
        program: true,
      },
    });
  }

  async findOne(id: number) {
    const course = await this.courseRepository.findOne({
      where: { id },
      order: {
        program: {
          cohorts: {
            id: 'DESC',
            classes: { startAt: 'ASC', endAt: 'ASC' },
          },
          courses: { id: 'DESC' },
        },
      },
      relations: {
        program: {
          cohorts: {
            intake: true,
            periodOfDay: true,
            program: true,
            classes: {
              cohort: {
                intake: true,
                periodOfDay: true,
                program: true,
                classes: {
                  cohort: {
                    intake: true,
                    program: true,
                  },
                  weekdaysRange: true,
                  course: true,
                  classroom: true,
                  instructor: true,
                },
              },
            },
          },
          courses: true,
        },
      },
    });

    if (!course) {
      throw new NotFoundException('Course Not Found');
    }

    return course;
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    const { name, requiredHours, programId } = updateCourseDto;

    const course = await this.courseRepository.findOneBy({ id });
    if (!course) {
      throw new NotFoundException('Course Not Found');
    }

    course.name = name ?? course.name;
    course.requiredHours = requiredHours ?? requiredHours;
    if (programId) {
      const program = await this.programRepository.findOneBy({ id: programId });
      course.program = program;
    }

    await this.courseRepository.save(course);

    return await this.findOne(course.id);
  }

  async remove(id: number) {
    const course = await this.courseRepository.findOne({
      where: { id },
      relations: {
        classes: true,
      },
    });

    if (!course) {
      throw new NotFoundException('Course Not Found');
    }

    if (course.classes.length > 0) {
      throw new BadRequestException(
        'Cannot delete course that are selected in the schedule',
      );
    }

    await this.courseRepository.delete(course.id);
  }
}
