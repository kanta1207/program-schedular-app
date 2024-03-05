import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Break } from '../entity/breaks.entity';
import { Repository } from 'typeorm';
import { StatusCodes } from 'src/common/status-code';

@Injectable()
export class BreaksService {
  constructor(
    @InjectRepository(Break)
    private readonly breakRepository: Repository<Break>,
  ) {}

  /**
   * Return all breaks
   *
   * @return {Promise<Break[]>}
   * @memberof BreaksService
   */
  async findAll(): Promise<Break[]> {
    try {
      return await this.breakRepository.find();
    } catch (error) {
      throw new HttpException(
        'Failed to get breaks.',
        StatusCodes.STATUS_INTERNAL_SERVER_ERROR.code,
      );
    }
  }

  /**
   *
   *
   * @param {number} id
   * @return {Promise<Break>}
   * @memberof BreaksService
   */
  async findOne(id: number): Promise<Break> {
    try {
      const breakData = await this.breakRepository.findOneBy({ id });
      if (!breakData) {
        throw new NotFoundException('Break not found');
      }

      return breakData;
    } catch (error) {
      throw new HttpException(
        'Failed to find break by id',
        StatusCodes.STATUS_INTERNAL_SERVER_ERROR.code,
      );
    }
  }
}
