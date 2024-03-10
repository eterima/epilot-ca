import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { UserMongoDBRepositoryImplementation } from './database/mongodb/user.mongodb.repository';
import { CreateUserDTO } from './dtos/create-user.dto';
import { User, UserWithPassword } from './user.interface';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
    @Inject(UserMongoDBRepositoryImplementation)
    private userRepo: UserRepository,
  ) {}

  async createUser(createUserDTO: CreateUserDTO): Promise<User> {
    try {
      const { password, ...partialCreateUserDTO } = createUserDTO;

      const existingUser = await this.userRepo.findUserByEmail(
        createUserDTO.email,
      );

      this.logger.log('Creating user', { partialCreateUserDTO });

      if (existingUser) {
        const errorMessage = 'User with email already exists';
        this.logger.log(errorMessage, { partialCreateUserDTO });
        throw new BadRequestException(errorMessage);
      }

      const hashedPassword = await this.hashPassword(password);
      const createdUser = await this.userRepo.createUser({
        ...partialCreateUserDTO,
        password: hashedPassword,
      });
      return createdUser;
    } catch (error) {
      throw error;
    }
  }

  async getUserByEmail(email: string): Promise<UserWithPassword> {
    return this.userRepo.findUserByEmail(email);
  }

  async getUserById(id: string): Promise<User> {
    return this.userRepo.findUserById(id);
  }

  async updateAllTimeScore(
    allTimeScore: 'increment_by_1' | 'decrement_by_1',
    playerId: string,
  ) {
    this.logger.log('Updating all time score', { allTimeScore, playerId });
    const user = await this.getUserById(playerId);

    const newAllTimeScore =
      allTimeScore === 'decrement_by_1'
        ? user.allTimeScore - 1
        : user.allTimeScore + 1;

    this.logger.log('New all time score to be set', {
      allTimeScore,
      playerId,
      newAllTimeScore,
    });
    return this.userRepo.updateAllTimeScore(
      // Making sure it never goes lower than 0
      Math.max(newAllTimeScore, 0),
      playerId,
    );
  }

  private async hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }
}
