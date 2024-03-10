import axios from 'axios';
import { BTCApi } from '../btc-api.port';
import { Logger, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from 'src/config/config.types';

export class GBXApi implements BTCApi {
  private readonly logger = new Logger(GBXApi.name);
  async getCurrentValue(): Promise<number> {
    const configService = new ConfigService<AppConfig>();
    try {
      this.logger.log('Getting BTC Current value');
      const options = {
        method: 'GET',
        url: 'https://bitcoinaverage-global-bitcoin-index-v1.p.rapidapi.com/indices/global/ticker/BTCUSD',
        headers: {
          'X-RapidAPI-Key': configService.get('X-RapidAPI-Key'),
          'X-RapidAPI-Host':
            'bitcoinaverage-global-bitcoin-index-v1.p.rapidapi.com',
        },
      };
      const response = await axios.request<{ last: number }>(options);
      this.logger.log('Current btc value', { value: response.data.last });
      return response.data.last;
    } catch (error) {
      const errorMessage = 'Unable to connect to GBXApi';
      this.logger.error(errorMessage, { error });
      throw new ServiceUnavailableException(errorMessage);
    }
  }
}
