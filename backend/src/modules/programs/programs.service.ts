import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Program } from '../../entity/programs.entity';
import { Repository } from 'typeorm';
import { StatusCodes } from 'src/common/status-code';

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
   * Update a program
   * @returns updated program
   * @memberof {@link ProgramsService}
   */
  async update() {
    try {
    } catch (error) {}
  }

  /**
   * Delete a program
   * @returns deleted program
   * @memberof {@link ProgramsService}
   */
  async delete() {
    try {
    } catch (error) {}
  }
}
