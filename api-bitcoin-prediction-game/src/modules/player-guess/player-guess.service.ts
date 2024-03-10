import { Inject, Injectable, Logger } from '@nestjs/common';
import { PlayerGuessRepository } from './player-guess.repository';
import { PlayerGuessMongoDBRepositoryImplementation } from './database/player-guess.mongodb.repository';
import { CreatePlayerGuessDTO } from './dtos/create-player-guess.dto';
import { UserService } from '../user/user.service';
import { BTCApi } from '../btc-api/btc-api.port';
import { GBXApi } from '../btc-api/adapters/gbx.api';
import { Guess } from './player-guess.interface';

@Injectable()
export class PlayerGuessService {
  private readonly logger = new Logger(PlayerGuessService.name);
  constructor(
    @Inject(PlayerGuessMongoDBRepositoryImplementation)
    private playerGuessRepo: PlayerGuessRepository,
    private userService: UserService,
    @Inject(GBXApi)
    private btcApi: BTCApi,
  ) {}

  async createPlayerGuess(createPlayerGuessDto: CreatePlayerGuessDTO) {
    try {
      this.logger.log('Creating player guess', { createPlayerGuessDto });

      const btcValueAfter = await this.btcApi.getCurrentValue();

      const isGuessCorrect =
        btcValueAfter > createPlayerGuessDto.btcValue &&
        createPlayerGuessDto.guess === Guess.UP;

      const score = isGuessCorrect ? 'increment_by_1' : 'decrement_by_1';
      // TODO - Do this with promise all
      await this.userService.updateAllTimeScore(
        score,
        createPlayerGuessDto.playerId,
      );

      console.log('AMKO', {
        ...createPlayerGuessDto,
        btcValueAfter,
      });

      const playerGuess = await this.playerGuessRepo.createPlayerGuess({
        ...createPlayerGuessDto,
        btcValueAfter,
      });
      return playerGuess;
    } catch (error) {
      throw error;
    }
  }
}
