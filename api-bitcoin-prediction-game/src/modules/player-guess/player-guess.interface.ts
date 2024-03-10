import { User } from '../user/user.interface';

export enum Guess {
  DOWN = 0,
  UP = 1,
}

export interface PlayerGuess {
  id: string;
  guess: Guess;
  isWin: boolean;
  playerId: string;
  btcValue: number;
  btcValueAfter: number;
  player?: User;
  createdAt?: Date;
  updatedAt?: Date;
}
