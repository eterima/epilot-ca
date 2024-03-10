import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { PlayerGuessModule } from './modules/player-guess/player-guess.module';
import { BtcApiModule } from './modules/btc-api/btc-api.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    UserModule,
    AuthModule,
    PlayerGuessModule,
    BtcApiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
