import { User } from '../user/user.interface';

export enum Guess {
  DOWN = 0,
  UP = 1,
}

export interface PlayerGuess {
  id: string;
  guess: Guess;
  completed: boolean;
  scheduledAt: Date;
  playerId: string;
  player?: User;
  createdAt?: Date;
  updatedAt?: Date;
}
