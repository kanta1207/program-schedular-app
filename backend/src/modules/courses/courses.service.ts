import { Injectable } from '@nestjs/common';
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
    return await this.courseRepository.findOne({
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
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    const { name, requiredHours, programId } = updateCourseDto;

    const course = await this.courseRepository.findOneBy({ id });

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
    await this.courseRepository.softDelete(id);
  }
}
