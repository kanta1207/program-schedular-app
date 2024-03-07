import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dataSourceOptions } from './data-source';
import { ProgramsModule } from './modules/programs/programs.module';
import { IntakesModule } from './modules/intakes/intakes.module';
import { BreaksModule } from './modules/breaks/breaks.module';
import { CohortsModule } from './modules/cohorts/cohorts.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(dataSourceOptions),
    IntakesModule,
    BreaksModule,
    ProgramsModule,
    CohortsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
