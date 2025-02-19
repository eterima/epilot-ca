import { IsNotEmpty, IsNumber, IsIn } from 'class-validator';

export class CreatePlayerGuessValidation {
  @IsNotEmpty()
  @IsNumber()

  // 0 - Down, 1 - Up
  @IsIn([0, 1])
  guess: number;

  @IsNotEmpty()
  @IsNumber()
  btcValue: number;
}
