import { Guess } from '../player-guess.interface';

export class CreatePlayerGuessDTO {
  guess: Guess;
  playerId: string;
  btcValue: number;
  btcValueAfter?: number;
}
