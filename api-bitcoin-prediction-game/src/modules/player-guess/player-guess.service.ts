import { Inject, Injectable, Logger } from '@nestjs/common';
import { PlayerGuessRepository } from './player-guess.repository';
import { PlayerGuessMongoDBRepositoryImplementation } from './database/player-guess.mongodb.repository';
import { CreatePlayerGuessDTO } from './dtos/create-player-guess.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class PlayerGuessService {
  private readonly logger = new Logger(PlayerGuessService.name);
  constructor(
    @Inject(PlayerGuessMongoDBRepositoryImplementation)
    private playerGuessRepo: PlayerGuessRepository,
    private userService: UserService,
  ) {}

  async createPlayerGuess(createPlayerGuessDto: CreatePlayerGuessDTO) {
    try {
      this.logger.log('Creating player guess', { createPlayerGuessDto });

      // TODO - Get data from API

      // TODO - Do this with promise all
      const updatedPlayer = await this.userService.updateAllTimeScore(
        'increment_by_1',
        createPlayerGuessDto.playerId,
      );
      const playerGuess = await this.playerGuessRepo.createPlayerGuess(
        createPlayerGuessDto,
      );
      return playerGuess;
    } catch (error) {
      throw error;
    }
  }
}
