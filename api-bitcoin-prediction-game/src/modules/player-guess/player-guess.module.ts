import { Module } from '@nestjs/common';
import { PlayerGuessService } from './player-guess.service';
import { PlayerGuessController } from './player-guess.controller';
import { PlayerGuessMongoDBRepositoryImplementation } from './database/player-guess.mongodb.repository';

@Module({
  providers: [
    PlayerGuessService,
    {
      provide: PlayerGuessMongoDBRepositoryImplementation,
      useClass: PlayerGuessMongoDBRepositoryImplementation,
    },
  ],
  controllers: [PlayerGuessController],
})
export class PlayerGuessModule {}
