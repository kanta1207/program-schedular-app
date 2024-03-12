import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Program } from 'src/entity';

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
    const deleteResult = await this.programRepository.delete(id);

    if (deleteResult.affected === 0) {
      throw new NotFoundException('Program Not Found');
    }
  }
}
