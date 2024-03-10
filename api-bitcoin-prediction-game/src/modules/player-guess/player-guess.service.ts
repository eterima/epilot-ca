import { Inject, Injectable, Logger } from '@nestjs/common';
import { PlayerGuessRepository } from './player-guess.repository';
import { PlayerGuessMongoDBRepositoryImplementation } from './database/player-guess.mongodb.repository';

@Injectable()
export class PlayerGuessService {
  private readonly logger = new Logger(PlayerGuessService.name);
  constructor(
    @Inject(PlayerGuessMongoDBRepositoryImplementation)
    private playerGuessRepo: PlayerGuessRepository,
  ) {}
}
