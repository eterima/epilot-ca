import { BadRequestException } from '@nestjs/common';
import { CreatePlayerGuessDTO } from '../dtos/create-player-guess.dto';
import { Guess } from '../player-guess.interface';
import { CreatePlayerGuessValidation } from '../validation/create-player-guess.validation';

export const createPlayerGuessValidationToDto = (
  validation: CreatePlayerGuessValidation,
  playerId: string,
): CreatePlayerGuessDTO => ({
  playerId,
  guess: mapGuessInputToEnum(validation.guess),
  btcValue: validation.btcValue,
});

const mapGuessInputToEnum = (guessInput: number): Guess => {
  if (guessInput === 0) {
    return Guess.DOWN;
  }
  if (guessInput === 1) {
    return Guess.UP;
  }
  throw new BadRequestException('Unsupported guess type');
};
