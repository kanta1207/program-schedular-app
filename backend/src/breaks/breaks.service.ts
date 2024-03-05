import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Break } from '../entity/breaks.entity';
import { Repository } from 'typeorm';

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
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
