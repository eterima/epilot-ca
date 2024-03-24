import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { PlayerGuessModel } from './player-guess.mongodb.schema';
import { PlayerGuessRepository } from '../player-guess.repository';
import { CreatePlayerGuessDTO } from '../dtos/create-player-guess.dto';
import { PlayerGuess } from '../player-guess.interface';
import { SOMETHING_WENT_WRONG } from '../../../errors/custom-errors-messages';

@Injectable()
export class PlayerGuessMongoDBRepositoryImplementation
  implements PlayerGuessRepository
{
  playerGuessModel: typeof PlayerGuessModel;
  private readonly logger = new Logger(
    PlayerGuessMongoDBRepositoryImplementation.name,
  );
  constructor() {
    this.playerGuessModel = PlayerGuessModel;
  }
  async createPlayerGuess(
    createPlayerGuessInput: CreatePlayerGuessDTO,
  ): Promise<PlayerGuess> {
    try {
      this.logger.log('Creating player guess', createPlayerGuessInput);
      const newPlayerGuess = new this.playerGuessModel({
        guess: createPlayerGuessInput.guess,
        playerId: createPlayerGuessInput.playerId,
        btcValue: createPlayerGuessInput.btcValue,
        btcValueAfter: createPlayerGuessInput.btcValueAfter,
        isWin: createPlayerGuessInput.isWin,
      });

      const savedPlayerGuess = await newPlayerGuess.save();
      const playerGuess: PlayerGuess = {
        id: savedPlayerGuess._id,
        guess: savedPlayerGuess.guess,
        playerId: String(savedPlayerGuess.playerId),
        isWin: savedPlayerGuess.isWin,
        btcValue: savedPlayerGuess.btcValue,
        btcValueAfter: savedPlayerGuess.btcValueAfter,
      };

      this.logger.log('Player Guess created', createPlayerGuessInput);
      return playerGuess;
    } catch (error) {
      this.logger.error(SOMETHING_WENT_WRONG, error, createPlayerGuessInput);
      throw new InternalServerErrorException(SOMETHING_WENT_WRONG);
    }
  }
}
