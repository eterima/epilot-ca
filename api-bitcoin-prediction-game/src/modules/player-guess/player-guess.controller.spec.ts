import { Test, TestingModule } from '@nestjs/testing';
import { PlayerGuessController } from './player-guess.controller';

describe('PlayerGuessController', () => {
  let controller: PlayerGuessController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlayerGuessController],
    }).compile();

    controller = module.get<PlayerGuessController>(PlayerGuessController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
