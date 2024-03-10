import { Guess } from '../player-guess.interface';

export class CreatePlayerGuessDTO {
  guess: Guess;
  scheduledAt: string;
  playerId: string;
}
