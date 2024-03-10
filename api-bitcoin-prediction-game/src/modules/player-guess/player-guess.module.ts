import { Module } from '@nestjs/common';
import { PlayerGuessService } from './player-guess.service';
import { PlayerGuessController } from './player-guess.controller';

@Module({
  providers: [PlayerGuessService],
  controllers: [PlayerGuessController],
})
export class PlayerGuessModule {}
