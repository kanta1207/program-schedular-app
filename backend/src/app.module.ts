import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dataSourceOptions } from './data-source';
import { IntakesModule } from './intakes/intakes.module';
import { BreaksModule } from './breaks/breaks.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(dataSourceOptions),
    IntakesModule,
    BreaksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
