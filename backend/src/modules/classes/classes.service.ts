import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';

import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';

import { Instructor, Cohort } from 'src/entity';

@Injectable()
export class ClassesService {
  constructor(
    @InjectRepository(Cohort)
    private readonly cohortRepository: Repository<Cohort>,
    @InjectRepository(Instructor)
    private readonly instructorRepository: Repository<Instructor>,
  ) {}

  create(createClassDto: CreateClassDto) {
    console.error(createClassDto);
    throw new Error('Not implemented');
  }

  async findAll(
    groupBy: string,
    cohortIds?: string[],
    instructorIds?: string[],
  ) {
    // Class attribute must be the same regardless of group by
    const classRelation = {
      instructor: true,
      classroom: true,
      course: true,
      weekdaysRange: true,
      cohort: {
        periodOfDay: true,
      },
    };

    if (groupBy === 'cohort') {
      return await this.cohortRepository.find({
        relations: {
          intake: true,
          classes: classRelation,
        },
        where: {
          classes: {
            cohort: cohortIds && { id: In(cohortIds) },
            instructor: instructorIds && { id: In(instructorIds) },
          },
        },
        order: {
          intake: {
            startAt: 'DESC',
            endAt: 'DESC',
          },
          id: 'ASC',
          classes: {
            startAt: 'ASC',
            endAt: 'ASC',
          },
        },
      });
    } else if (groupBy === 'instructor') {
      return await this.instructorRepository.find({
        relations: {
          classes: classRelation,
        },
        where: {
          isActive: true,
          classes: {
            cohort: cohortIds && { id: In(cohortIds) },
            instructor: instructorIds && { id: In(instructorIds) },
          },
        },
        order: {
          id: 'DESC',
          classes: {
            startAt: 'ASC',
            endAt: 'ASC',
          },
        },
      });
    } else {
      throw new BadRequestException('Unexpected groupBy value');
    }
  }

  findOne(id: number) {
    console.error(id);
    throw new Error('Not implemented');
  }

  update(id: number, updateClassDto: UpdateClassDto) {
    console.error(id, updateClassDto);
    throw new Error('Not implemented');
  }

  remove(id: number) {
    console.error(id);
    throw new Error('Not implemented');
  }
}
