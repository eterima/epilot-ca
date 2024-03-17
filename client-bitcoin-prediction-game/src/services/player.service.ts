import { AxiosInstance } from "axios";
import { httpService } from "./http.service";
import { LoginDTO, RegisterDTO } from "../dtos/auth.dto";
import { JWTToken, Player } from "../types/player.type";

export class PlayerService {
  constructor(private httpService: AxiosInstance) {
    this.httpService = httpService;
  }
  async createUser({ email, password }: RegisterDTO): Promise<Player> {
    const response = await this.httpService.post<Player>("/users", {
      email,
      password,
    });
    return response.data;
  }

  async loginPlayer({ email, password }: LoginDTO): Promise<JWTToken> {
    const response = await this.httpService.post<JWTToken>("/auth/login", {
      email,
      password,
    });
    return response.data;
  }
}

export const playerService = new PlayerService(httpService);
