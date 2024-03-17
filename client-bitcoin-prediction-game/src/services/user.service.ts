import { AxiosInstance } from "axios";
import { httpService } from "./http.service";
import { RegisterDTO } from "../dtos/auth.dto";
import { Player } from "../types/player.type";

export class UserService {
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
}

export const userService = new UserService(httpService);
