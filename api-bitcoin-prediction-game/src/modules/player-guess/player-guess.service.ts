import { Inject, Injectable, Logger } from '@nestjs/common';
import { PlayerGuessRepository } from './player-guess.repository';
import { PlayerGuessMongoDBRepositoryImplementation } from './database/player-guess.mongodb.repository';
import { CreatePlayerGuessDTO } from './dtos/create-player-guess.dto';

@Injectable()
export class PlayerGuessService {
  private readonly logger = new Logger(PlayerGuessService.name);
  constructor(
    @Inject(PlayerGuessMongoDBRepositoryImplementation)
    private playerGuessRepo: PlayerGuessRepository,
  ) {}

  async createPlayerGuess(createPlayerGuessDto: CreatePlayerGuessDTO) {
    try {
      this.logger.log('Creating player guess', { createPlayerGuessDto });

      // TODO - Validate that scheduled time is not off/hacky
      const playerGuess = await this.playerGuessRepo.createPlayerGuess(
        createPlayerGuessDto,
      );
      return playerGuess;
    } catch (error) {
      throw error;
    }
  }
}
