import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCohortDto } from './dto/create-cohort.dto';
import { UpdateCohortDto } from './dto/update-cohort.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cohort } from '../../entity/cohorts.entity';
import { Repository } from 'typeorm';
import { Intake } from '../../entity/intakes.entity';
import { MasterPeriodOfDay } from '../../entity/masterPeriodOfDays.entity';
import { Program } from '../../entity/programs.entity';

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
  ) {}

  // TODO: Remove
  private readonly relationList = [
    'intake',
    'program',
    'periodOfDay',
    'classes',
    'classes.cohort',
    'classes.weekdaysRange',
    'classes.course',
    'classes.classroom',
    'classes.instructor',
  ];

  async create(createCohortDto: CreateCohortDto) {
    const { name, intakeId, periodOfDayId, programId } = createCohortDto;

    const intake = await this.intakeRepository.findOneBy({ id: intakeId });
    const periodOfDay = await this.periodOfDayRepository.findOneBy({
      id: periodOfDayId,
    });
    const program = await this.programRepository.findOneBy({ id: programId });
    const cohort = this.cohortRepository.create({
      name,
      intake,
      periodOfDay,
      program,
    });

    return await this.cohortRepository.save(cohort);
  }

  // TODO: Specify relations wit object
  async findAll() {
    return await this.cohortRepository.find({
      relations: this.relationList,
    });
  }

  // TODO: Specify relations wit object
  async findOne(id: number) {
    const cohort = await this.cohortRepository.findOne({
      where: { id },
      relations: this.relationList,
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
    if (intakeId) {
      const intake = await this.intakeRepository.findOneBy({ id: intakeId });
      if (!intake) {
        throw new NotFoundException('Intake Not Found');
      }
      cohort.intake = intake;
    }

    if (updateCohortDto.periodOfDayId) {
      const periodOfDay = await this.periodOfDayRepository.findOneBy({
        id: periodOfDayId,
      });
      if (!periodOfDay) {
        throw new NotFoundException('PeriodOfDay Not Found');
      }
      cohort.periodOfDay = periodOfDay;
    }

    if (updateCohortDto.programId) {
      const program = await this.programRepository.findOneBy({ id: programId });
      if (!program) {
        throw new NotFoundException(`Program Not Found`);
      }
      cohort.program = program;
    }

    if (name) {
      cohort.name = name;
    }

    await this.cohortRepository.save(cohort);

    return cohort;
  }

  async remove(id: number) {
    await this.cohortRepository.delete(id);
  }
}
