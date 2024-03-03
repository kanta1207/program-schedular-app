import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateIntakeDto } from './dto/create-intake.dto';
import { UpdateIntakeDto } from './dto/update-intake.dto';
import { Repository } from 'typeorm';
import { Intake } from 'src/entity/intakes.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class IntakesService {
  constructor(
    @InjectRepository(Intake)
    private readonly intakeRepository: Repository<Intake>,
  ) {}

  create(createIntakeDto: CreateIntakeDto) {
    return this.intakeRepository.save(createIntakeDto);
  }

  async findAll() {
    const intakes = await this.intakeRepository.find({
      order: {
        id: 'DESC',
      },
    });
    return intakes;
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
