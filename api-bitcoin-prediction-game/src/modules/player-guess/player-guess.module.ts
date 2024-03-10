import { Module } from '@nestjs/common';
import { PlayerGuessService } from './player-guess.service';
import { PlayerGuessController } from './player-guess.controller';
import { PlayerGuessMongoDBRepositoryImplementation } from './database/player-guess.mongodb.repository';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
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
