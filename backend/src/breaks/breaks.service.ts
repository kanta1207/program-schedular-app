import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Break } from '../entity/breaks.entity';
import { Repository } from 'typeorm';

// type ApiResponse<T> = {
//   statusCode: number;
//   messages: string;
//   data: T;
// };

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
      Logger.error(error);
      throw new HttpException(
        'Failed to get breaks.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
