import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Program } from '../../entity/programs.entity';
import { Repository } from 'typeorm';

import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';

@Injectable()
export class ProgramsService {
  constructor(
    @InjectRepository(Program)
    private readonly programRepository: Repository<Program>,
  ) {}

  async findAll() {
    return await this.programRepository.find();
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
    });
    if (!program) {
      throw new NotFoundException('Program not found');
    }
  }
}
