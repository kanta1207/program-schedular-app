import { Module } from '@nestjs/common';
import { IntakesController } from './intakes.controller';
import { IntakesService } from './intakes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Intake } from 'src/entity/intakes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Intake])],
  controllers: [IntakesController],
  providers: [IntakesService],
})
export class IntakesModule {}
