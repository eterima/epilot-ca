import { Test, TestingModule } from '@nestjs/testing';
import { BtcApiService } from './btc-api.service';

describe('BtcApiService', () => {
  let service: BtcApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BtcApiService],
    }).compile();

    service = module.get<BtcApiService>(BtcApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
