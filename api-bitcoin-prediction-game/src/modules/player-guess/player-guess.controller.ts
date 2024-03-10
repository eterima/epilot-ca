import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { RequestWithUser } from 'src/global.types';
import { CreatePlayerGuessValidation } from './validation/create-player-guess.validation';
import { createPlayerGuessValidationToDto } from './mappers/createPlayerGuessValidationToDto';

@UseGuards(AuthGuard)
@Controller('player-guesses')
export class PlayerGuessController {
  @Post()
  async createPlayerGuess(
    @Request() req: RequestWithUser,
    @Body() createPlayerGuessInput: CreatePlayerGuessValidation,
  ) {
    const playerId = req.user.id;
    const createPlayerGuessDto = createPlayerGuessValidationToDto(
      createPlayerGuessInput,
      playerId,
    );
    return createPlayerGuessDto;
  }
}
