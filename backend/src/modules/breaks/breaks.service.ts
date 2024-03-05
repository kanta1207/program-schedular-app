import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Break } from '../../entity/breaks.entity';
import { Repository } from 'typeorm';
import { CreateBreakDto } from './dto/create-break.dto';
import { UpdateBreakDto } from './dto/update-break.dto';

@Injectable()
export class BreaksService {
  constructor(
    @InjectRepository(Break)
    private readonly breakRepository: Repository<Break>,
  ) {}

  async findAll(): Promise<Break[]> {
    try {
      return await this.breakRepository.find();
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number): Promise<Break> {
    try {
      return await this.breakRepository.findOneBy({ id });
    } catch (error) {
      throw error;
    }
  }

  async create(createBreakDto: CreateBreakDto): Promise<Break> {
    try {
      return this.breakRepository.save(createBreakDto);
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateBreakDto: UpdateBreakDto): Promise<Break> {
    try {
      await this.breakRepository.update(id, updateBreakDto);
      return await this.findOne(id);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      this.breakRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
