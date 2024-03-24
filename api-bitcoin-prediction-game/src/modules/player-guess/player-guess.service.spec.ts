import { Test, TestingModule } from '@nestjs/testing';
import { PlayerGuessService } from './player-guess.service';
import { PlayerGuessMongoDBRepositoryImplementation } from './database/player-guess.mongodb.repository';
import { UserService } from '../user/user.service';
import { GBXApi } from '../btc-api/adapters/gbx.api';
import { UserMongoDBRepositoryImplementation } from '../user/database/mongodb/user.mongodb.repository';
import { CreatePlayerGuessDTO } from './dtos/create-player-guess.dto';
import { Guess } from './player-guess.interface';

describe('PlayerGuessService', () => {
  let service: PlayerGuessService;
  let userService: UserService;
  let btcAPI: GBXApi;
  let playerGuessRepo: PlayerGuessMongoDBRepositoryImplementation;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlayerGuessService,
        {
          provide: UserService,
          useValue: {
            updateAllTimeScore: jest.fn(),
          },
        },
        {
          provide: GBXApi,
          useValue: {
            getCurrentValue: jest.fn(),
          },
        },
        {
          provide: UserMongoDBRepositoryImplementation,
          useValue: {
            findUserByEmail: jest.fn(),
            createUser: jest.fn(),
            findUserById: jest.fn(),
          },
        },
        {
          provide: PlayerGuessMongoDBRepositoryImplementation,
          useValue: {
            createPlayerGuess: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PlayerGuessService>(PlayerGuessService);
    userService = module.get<UserService>(UserService);
    btcAPI = module.get<GBXApi>(GBXApi);
    playerGuessRepo = module.get<PlayerGuessMongoDBRepositoryImplementation>(
      PlayerGuessMongoDBRepositoryImplementation,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createPlayerGuess', () => {
    it('should increment all time score by 1 if guess is UP, and next price is higer', async () => {
      const playerGuess: CreatePlayerGuessDTO = {
        guess: Guess.UP,
        playerId: '123',
        btcValue: 10_000,
      };
      const btcValueAfter = 11_000;
      jest
        .spyOn(btcAPI, 'getCurrentValue')
        .mockResolvedValueOnce(btcValueAfter);
      expect(true).toBe(true);

      await service.createPlayerGuess(playerGuess);
      expect(userService.updateAllTimeScore).toBeCalledWith(
        'increment_by_1',
        '123',
      );

      expect(playerGuessRepo.createPlayerGuess).toBeCalledWith({
        ...playerGuess,
        isWin: true,
        btcValueAfter,
      });
    });

    it('should increment all time score by 1 if guess is DOWN, and next price is lower', async () => {
      const playerGuess: CreatePlayerGuessDTO = {
        guess: Guess.DOWN,
        playerId: '123',
        btcValue: 11_000,
      };
      const btcValueAfter = 10_000;
      jest
        .spyOn(btcAPI, 'getCurrentValue')
        .mockResolvedValueOnce(btcValueAfter);
      expect(true).toBe(true);

      await service.createPlayerGuess(playerGuess);
      expect(userService.updateAllTimeScore).toBeCalledWith(
        'increment_by_1',
        '123',
      );

      expect(playerGuessRepo.createPlayerGuess).toBeCalledWith({
        ...playerGuess,
        isWin: true,
        btcValueAfter,
      });
    });

    it('should decrement all time score by 1 if guess is UP, and next price is lower', async () => {
      const playerGuess: CreatePlayerGuessDTO = {
        guess: Guess.UP,
        playerId: '123',
        btcValue: 11_000,
      };
      const btcValueAfter = 10_000;
      jest
        .spyOn(btcAPI, 'getCurrentValue')
        .mockResolvedValueOnce(btcValueAfter);
      expect(true).toBe(true);

      await service.createPlayerGuess(playerGuess);
      expect(userService.updateAllTimeScore).toBeCalledWith(
        'decrement_by_1',
        '123',
      );

      expect(playerGuessRepo.createPlayerGuess).toBeCalledWith({
        ...playerGuess,
        isWin: false,
        btcValueAfter,
      });
    });

    it('should decrement all time score by 1 if guess is DOWN, and next price is higher', async () => {
      const playerGuess: CreatePlayerGuessDTO = {
        guess: Guess.DOWN,
        playerId: '123',
        btcValue: 10_000,
      };
      const btcValueAfter = 11_000;
      jest
        .spyOn(btcAPI, 'getCurrentValue')
        .mockResolvedValueOnce(btcValueAfter);
      expect(true).toBe(true);

      await service.createPlayerGuess(playerGuess);
      expect(userService.updateAllTimeScore).toBeCalledWith(
        'decrement_by_1',
        '123',
      );

      expect(playerGuessRepo.createPlayerGuess).toBeCalledWith({
        ...playerGuess,
        isWin: false,
        btcValueAfter,
      });
    });
  });
});
