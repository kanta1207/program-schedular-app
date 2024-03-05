import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Program } from '../../entity/programs.entity';
import { Repository } from 'typeorm';
import { StatusCodes } from 'src/common/status-code';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';

@Injectable()
export class ProgramsService {
  constructor(
    @InjectRepository(Program)
    private readonly programRepository: Repository<Program>,
  ) {}

  /**
   * Return all programs
   * @returns all programs
   * @memberof {@link ProgramsService}
   */
  async findAll(): Promise<Program[]> {
    try {
      return await this.programRepository.find();
    } catch (error) {
      throw new HttpException(
        'Failed to get programs.',
        StatusCodes.STATUS_INTERNAL_SERVER_ERROR.code,
      );
    }
  }

  /**
   * Create a program
   * @param createProgramDto {@link CreateProgramDto} - program to be created
   * @returns created program
   * @memberof {@link ProgramsService}
   */
  async create(createProgramDto: CreateProgramDto): Promise<Program> {
    try {
      // Create a new program
      const program = this.programRepository.create(createProgramDto);
      // Save the program and return the result
      return await this.programRepository.save(program);
    } catch (error) {
      throw new HttpException(
        'Failed to create program.',
        StatusCodes.STATUS_INTERNAL_SERVER_ERROR.code,
      );
    }
  }

  /**
   * Update a program
   * @returns updated program
   * @param id - program id
   * @param updateProgramDto {@link UpdateProgramDto} - program to be updated
   * @memberof {@link ProgramsService}
   */
  async update(id: number, updateProgramDto: UpdateProgramDto) {
    try {
      const program = await this.programRepository.findOne({
        where: { id },
      });
      if (!program) {
        throw new NotFoundException('Program not found');
      }
      return await this.programRepository.update(id, updateProgramDto);
    } catch (error) {
      throw new HttpException(
        'Failed to update program.',
        StatusCodes.STATUS_INTERNAL_SERVER_ERROR.code,
      );
    }
  }

  /**
   * Delete a program
   * @returns deleted program
   * @memberof {@link ProgramsService}
   */
  async delete(id: number) {
    try {
      const program = await this.programRepository.findOne({
        where: { id },
      });
      if (!program) {
        throw new NotFoundException('Program not found');
      }
      return await this.programRepository.delete(id);
    } catch (error) {
      throw new HttpException(
        'Failed to delete program.',
        StatusCodes.STATUS_INTERNAL_SERVER_ERROR.code,
      );
    }
  }
}
