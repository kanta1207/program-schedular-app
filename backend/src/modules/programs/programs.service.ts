import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Program } from '../../entity';

import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';

@Injectable()
export class ProgramsService {
  constructor(
    @InjectRepository(Program)
    private readonly programRepository: Repository<Program>,
  ) {}

  async findAll() {
    return await this.programRepository.find({
      order: { id: 'DESC' },
    });
  }

  async create(createProgramDto: CreateProgramDto) {
    return await this.programRepository.save(createProgramDto);
  }

  async update(id: number, updateProgramDto: UpdateProgramDto) {
    const updatedResult = await this.programRepository.update(
      id,
      updateProgramDto,
    );
    if (updatedResult.affected === 0) {
      throw new NotFoundException('Program not found');
    }

    return await this.programRepository.findOneBy({ id });
  }

  async remove(id: number) {
    const program = await this.programRepository.findOne({
      where: { id },
      relations: {
        courses: true,
        cohorts: true,
      },
    });

    if (!program) {
      throw new NotFoundException('Program Not Found');
    }

    if (program.courses.length > 0) {
      throw new BadRequestException('Cannot delete program that has courses. ');
    }

    if (program.cohorts.length > 0) {
      throw new BadRequestException('Cannot delete program that has cohorts.');
    }

    await this.programRepository.delete(id);
  }
}
