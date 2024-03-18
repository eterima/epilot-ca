import { AxiosInstance } from "axios";
import { httpService } from "./http.service";

export class BTCService {
  constructor(private httpService: AxiosInstance) {
    this.httpService = httpService;
  }
  async getCurrentBTCValue(): Promise<number> {
    const response = await this.httpService.get<number>(
      "/btc-api/current-value",
    );
    return response.data;
  }
}

export const btcService = new BTCService(httpService);
