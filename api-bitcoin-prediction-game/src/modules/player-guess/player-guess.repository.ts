import { CreatePlayerGuessDTO } from './dtos/create-player-guess.dto';
import { PlayerGuess } from './player-guess.interface';

export interface PlayerGuessRepository {
  createPlayerGuess(
    createPlayerGuessInput: CreatePlayerGuessDTO,
  ): Promise<PlayerGuess>;
}
