import { Controller, Get, Logger } from '@nestjs/common';
import { BtcApiService } from './btc-api.service';

@Controller('btc-api')
export class BtcApiController {
  private readonly logger = new Logger(BtcApiController.name);
  constructor(private btcApiService: BtcApiService) {}
  @Get('/current-value')
  async getCurrentValue() {
    try {
      const currentValue = await this.btcApiService.getCurrentBTCValue();
      return currentValue;
    } catch (error) {
      throw error;
    }
  }
}
