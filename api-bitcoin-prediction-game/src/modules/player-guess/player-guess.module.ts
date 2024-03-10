import { Module } from '@nestjs/common';
import { PlayerGuessService } from './player-guess.service';
import { PlayerGuessController } from './player-guess.controller';
import { PlayerGuessMongoDBRepositoryImplementation } from './database/player-guess.mongodb.repository';
import { UserModule } from '../user/user.module';
import { GBXApi } from '../btc-api/adapters/gbx.api';

@Module({
  imports: [UserModule],
  providers: [
    PlayerGuessService,
    {
      provide: PlayerGuessMongoDBRepositoryImplementation,
      useClass: PlayerGuessMongoDBRepositoryImplementation,
    },
    {
      provide: GBXApi,
      useClass: GBXApi,
    },
  ],
  controllers: [PlayerGuessController],
})
export class PlayerGuessModule {}
