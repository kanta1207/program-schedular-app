import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateIntakeDto } from './dto/create-intake.dto';
import { UpdateIntakeDto } from './dto/update-intake.dto';
import { Repository } from 'typeorm';
import { Intake } from 'src/entity/intakes.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MasterPeriodOfDay } from 'src/entity/masterPeriodOfDays.entity';

@Injectable()
export class IntakesService {
  constructor(
    @InjectRepository(Intake)
    private readonly intakeRepository: Repository<Intake>,
    @InjectRepository(MasterPeriodOfDay)
    private readonly masterPeriodOfDayRepository: Repository<MasterPeriodOfDay>,
  ) {}

  create(createIntakeDto: CreateIntakeDto) {
    return this.intakeRepository.save(createIntakeDto);
  }

  async findAll() {
    const intakes = await this.intakeRepository.find({
      order: {
        id: 'DESC',
      },
      relations: ['cohorts.periodOfDay'],
    });

    const masterPeriodOfDays = await this.masterPeriodOfDayRepository.find();

    const formattedIntakes = intakes.map(
      ({ id, name, startAt, endAt, createdAt, updatedAt, cohorts }) => ({
        id,
        name,
        startAt,
        endAt,
        createdAt,
        updatedAt,
        periodOfDays: masterPeriodOfDays.map((period) => ({
          ...period,
          cohorts: cohorts
            .filter((cohort) => cohort.periodOfDay.id === period.id)
            .map(({ id, name, createdAt, updatedAt }) => ({
              id,
              name,
              createdAt,
              updatedAt,
            })),
        })),
      }),
    );
    return formattedIntakes;
  }

  async findOne(id: number) {
    const intake = await this.intakeRepository.findOne({
      where: {
        id,
      },
      relations: ['cohorts.periodOfDay', 'cohorts.program'],
    });

    if (!intake) throw new NotFoundException('Intake Not Found');

    return intake;
  }

  async update(id: number, updateIntakeDto: UpdateIntakeDto) {
    await this.intakeRepository.update(id, updateIntakeDto);
    return this.intakeRepository.findOneBy({ id });
  }

  async remove(id: number) {
    const deleteResult = await this.intakeRepository.delete(id);
    if (deleteResult.affected === 0) {
      throw new NotFoundException('Intake Not Found');
    }
  }
}
