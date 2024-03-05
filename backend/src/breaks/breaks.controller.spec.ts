import { Test, TestingModule } from '@nestjs/testing';
import { BreaksController } from './breaks.controller';

describe('BreaksController', () => {
  let controller: BreaksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BreaksController],
    }).compile();

    controller = module.get<BreaksController>(BreaksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
