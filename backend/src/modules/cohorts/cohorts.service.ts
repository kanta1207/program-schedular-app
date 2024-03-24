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
        classes: { startAt: 'ASC', endAt: 'ASC', weekdaysRange: { id: 'ASC' } },
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

    return cohort;
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
    const deleteResult = await this.cohortRepository.delete(id);

    if (deleteResult.affected === 0) {
      throw new NotFoundException('Cohort Not Found');
    }
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
}
