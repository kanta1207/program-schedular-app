import { Controller, Get } from '@nestjs/common';
import { BreaksService } from './breaks.service';

@Controller('breaks')
export class BreaksController {
  constructor(private readonly breakService: BreaksService) {}

  @Get()
  async findAll() {
    return this.breakService.findAll();
  }
}
