import { Module } from '@nestjs/common';
import { GBXApi } from './adapters/gbx.api';
import { BtcApiController } from './btc-api.controller';
import { BtcApiService } from './btc-api.service';

@Module({
  providers: [
    BtcApiService,
    {
      provide: GBXApi,
      useClass: GBXApi,
    },
  ],
  controllers: [BtcApiController],
})
export class BtcApiModule {}
