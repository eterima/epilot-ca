import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Logger,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { RequestWithUser } from 'src/global.types';
import { CreatePlayerGuessValidation } from './validation/create-player-guess.validation';
import { createPlayerGuessValidationToDto } from './mappers/createPlayerGuessValidationToDto';
import { PlayerGuessService } from './player-guess.service';

@UseGuards(AuthGuard)
@Controller('player-guesses')
export class PlayerGuessController {
  private readonly logger = new Logger(PlayerGuessController.name);
  constructor(private playerGuessService: PlayerGuessService) {}
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
    this.logger.log(
      'Request for creating player guess received',
      createPlayerGuessDto,
    );
    try {
      const playerGuess = await this.playerGuessService.createPlayerGuess(
        createPlayerGuessDto,
      );
      return playerGuess;
    } catch (error) {
      // TODO - Unify errors
      throw error;
    }
  }
}
