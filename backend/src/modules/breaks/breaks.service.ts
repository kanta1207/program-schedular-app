import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Break } from '../../entity/breaks.entity';
import { Repository } from 'typeorm';
import { CreateBreakDto } from './dto/create-break.dto';
import { UpdateBreakDto } from './dto/update-break.dto';
import checkDateOrder from 'src/common/utils/check-date-order.util';

@Injectable()
export class BreaksService {
  constructor(
    @InjectRepository(Break)
    private readonly breakRepository: Repository<Break>,
  ) {}

  async findAll() {
    return await this.breakRepository.find({
      order: {
        id: 'DESC',
      },
    });
  }

  async findOne(id: number) {
    return await this.breakRepository.findOneBy({ id });
  }

  async create(createBreakDto: CreateBreakDto) {
    return this.breakRepository.save(createBreakDto);
  }

  async update(id: number, updateBreakDto: UpdateBreakDto) {
    const { startAt, endAt } = updateBreakDto;
    const existingBreak = await this.breakRepository.findOneBy({ id });

    const isValidDateOrder = checkDateOrder(
      startAt,
      endAt,
      existingBreak.startAt,
      existingBreak.endAt,
    );
    if (!isValidDateOrder) {
      throw new BadRequestException('endAt must be after startAt');
    }

    const updatedResult = await this.breakRepository.update(id, updateBreakDto);

    if (updatedResult.affected === 0) {
      throw new NotFoundException('Break Not Found');
    }

    return await this.findOne(id);
  }

  async remove(id: number) {
    await this.breakRepository.delete(id);
  }
}
