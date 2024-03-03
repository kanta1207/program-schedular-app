import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { IntakesService } from './intakes.service';
import { CreateIntakeDto } from './dto/create-intake.dto';
import { UpdateIntakeDto } from './dto/update-intake.dto';

@Controller('intakes')
export class IntakesController {
  constructor(private readonly intakesService: IntakesService) {}

  @Post()
  create(@Body() createIntakeDto: CreateIntakeDto) {
    return this.intakesService.create(createIntakeDto);
  }

  @Get()
  findAll() {
    return this.intakesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.intakesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateIntakeDto: UpdateIntakeDto) {
    return this.intakesService.update(id, updateIntakeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.intakesService.remove(id);
  }
}
