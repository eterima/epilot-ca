import { AxiosInstance } from "axios";
import { httpService } from "./http.service";
import { Player } from "../types/player.type";
import { CreateGuessDTO } from "../dtos/create-guess.dto";
import { Guess } from "../types/guess.type";

export class GuessService {
  constructor(private httpService: AxiosInstance) {
    this.httpService = httpService;
  }
  async createGuess({ btcValue, guess }: CreateGuessDTO): Promise<Guess> {
    const response = await this.httpService.post<Guess>("/player-guesses", {
      btcValue,
      guess,
    });
    return response.data;
  }
}

export const guessService = new GuessService(httpService);
