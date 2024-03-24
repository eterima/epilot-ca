import { Inject, Injectable } from '@nestjs/common';
import { GBXApi } from './adapters/gbx.api';
import { BTCApi } from './btc-api.port';

@Injectable()
export class BtcApiService {
  constructor(
    @Inject(GBXApi)
    private btcApi: BTCApi,
  ) {}

  async getCurrentBTCValue() {
    return this.btcApi.getCurrentValue();
  }
}
