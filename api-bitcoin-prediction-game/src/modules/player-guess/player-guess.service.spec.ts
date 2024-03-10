import { Test, TestingModule } from '@nestjs/testing';
import { PlayerGuessService } from './player-guess.service';

describe('PlayerGuessService', () => {
  let service: PlayerGuessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlayerGuessService],
    }).compile();

    service = module.get<PlayerGuessService>(PlayerGuessService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
