import { Injectable } from '@nestjs/common';
import { CreateCohortDto } from './dto/create-cohort.dto';
import { UpdateCohortDto } from './dto/update-cohort.dto';

@Injectable()
export class CohortsService {
  create(createCohortDto: CreateCohortDto) {
    return 'This action adds a new cohort';
  }

  findAll() {
    return `This action returns all cohorts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cohort`;
  }

  update(id: number, updateCohortDto: UpdateCohortDto) {
    return `This action updates a #${id} cohort`;
  }

  remove(id: number) {
    return `This action removes a #${id} cohort`;
  }
}
