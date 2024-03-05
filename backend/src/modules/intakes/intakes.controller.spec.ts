import { Test, TestingModule } from '@nestjs/testing';
import { IntakesController } from './intakes.controller';

describe('IntakesController', () => {
  let controller: IntakesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IntakesController],
    }).compile();

    controller = module.get<IntakesController>(IntakesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
