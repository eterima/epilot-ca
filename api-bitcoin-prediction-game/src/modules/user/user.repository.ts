import { CreateUserDTO } from './dtos/create-user.dto';
import { User, UserWithPassword } from './user.interface';

export interface UserRepository {
  createUser(createUserInput: CreateUserDTO): Promise<User>;
  findUserByEmail(email: string): Promise<UserWithPassword>;
  findUserById(id: string): Promise<User>;
  updateAllTimeScore(newAllTimeScore: number, playerId: string): Promise<User>;
}
