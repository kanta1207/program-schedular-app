import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateIntakeDto } from './dto/create-intake.dto';
import { UpdateIntakeDto } from './dto/update-intake.dto';
import { Intake, MasterPeriodOfDay } from '../../entity';
import { checkDateOrder } from 'src/common/utils';

@Injectable()
export class IntakesService {
  constructor(
    @InjectRepository(Intake)
    private readonly intakeRepository: Repository<Intake>,
    @InjectRepository(MasterPeriodOfDay)
    private readonly masterPeriodOfDayRepository: Repository<MasterPeriodOfDay>,
  ) {}

  async create(createIntakeDto: CreateIntakeDto) {
    return await this.intakeRepository.save(createIntakeDto);
  }

  async findAll() {
    const [masterPeriodOfDays, intakes] = await Promise.all([
      this.masterPeriodOfDayRepository.find(),
      this.intakeRepository.find({
        order: {
          id: 'DESC',
        },
        relations: {
          cohorts: {
            periodOfDay: true,
          },
        },
      }),
    ]);

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
            }))
            .sort((a, b) => a.id - b.id),
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
      relations: {
        cohorts: {
          periodOfDay: true,
          program: true,
        },
      },
    });

    if (!intake) {
      throw new NotFoundException('Intake Not Found');
    }

    return intake;
  }

  async update(id: number, updateIntakeDto: UpdateIntakeDto) {
    const { startAt, endAt } = updateIntakeDto;
    const existingIntake = await this.intakeRepository.findOneBy({ id });

    const isValidDateOrder = checkDateOrder({
      newStartAt: startAt,
      newEndAt: endAt,
      existingStartAt: existingIntake.startAt,
      existingEndAt: existingIntake.endAt,
    });
    if (!isValidDateOrder) {
      throw new BadRequestException('endAt must be after startAt');
    }

    const updateResult = await this.intakeRepository.update(
      id,
      updateIntakeDto,
    );

    if (updateResult.affected === 0) {
      throw new NotFoundException('Intake Not Found');
    }

    const intake = this.intakeRepository.findOne({
      where: {
        id,
      },
      relations: {
        cohorts: {
          periodOfDay: true,
          program: true,
        },
      },
    });

    return intake;
  }

  async remove(id: number) {
    const deleteResult = await this.intakeRepository.delete(id);

    if (deleteResult.affected === 0) {
      throw new NotFoundException('Intake Not Found');
    }
  }
}
