import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from '../../user.repository';
import { CreateUserDTO } from '../../dtos/create-user.dto';
import { User, UserWithPassword } from '../../user.interface';
import { UserModel } from './user.mongodb.schema';
import { SOMETHING_WENT_WRONG } from '../../../../errors/custom-errors-messages';

@Injectable()
export class UserMongoDBRepositoryImplementation implements UserRepository {
  userModel: typeof UserModel;
  private readonly logger = new Logger(
    UserMongoDBRepositoryImplementation.name,
  );
  constructor() {
    this.userModel = UserModel;
  }
  async createUser(createUserInput: CreateUserDTO): Promise<User> {
    try {
      this.logger.log('Creating user', createUserInput);
      const newUser = new this.userModel({
        email: createUserInput.email,
        password: createUserInput.password,
      });

      const savedUser = await newUser.save();
      const user: User = {
        id: savedUser.id,
        email: savedUser.email,
        allTimeScore: savedUser.allTimeScore,
      };

      this.logger.log('User created', createUserInput);
      return user;
    } catch (error) {
      this.logger.error(SOMETHING_WENT_WRONG, error, createUserInput);
      throw new InternalServerErrorException(SOMETHING_WENT_WRONG);
    }
  }
  async findUserByEmail(email: string): Promise<UserWithPassword | null> {
    try {
      this.logger.log('Getting user by email', { email });
      const dbUser = await this.userModel.findOne({ email: email });
      if (!dbUser) {
        return null;
      }
      const user: UserWithPassword = {
        id: dbUser.id,
        email: dbUser.email,
        password: dbUser.password,
        allTimeScore: dbUser.allTimeScore,
      };

      this.logger.log('User by email found', { email, id: dbUser.id });
      return user;
    } catch (error) {
      this.logger.error(SOMETHING_WENT_WRONG, error, { email });
      throw new InternalServerErrorException(SOMETHING_WENT_WRONG);
    }
  }

  async findUserById(id: string): Promise<User | null> {
    try {
      this.logger.log('Getting user by id', { id });
      const dbUser = await this.userModel.findById(id);
      if (!dbUser) {
        return null;
      }
      const user: User = {
        id: dbUser.id,
        email: dbUser.email,
        allTimeScore: dbUser.allTimeScore,
      };

      this.logger.log('User by id found', { id, user });

      return user;
    } catch (error) {
      this.logger.error(SOMETHING_WENT_WRONG, error, { id });
      throw new InternalServerErrorException(SOMETHING_WENT_WRONG);
    }
  }

  async updateAllTimeScore(
    newAllTimeScore: number,
    playerId: string,
  ): Promise<User> {
    try {
      const updatedUser = await this.userModel.findOneAndUpdate(
        { _id: playerId },
        { allTimeScore: newAllTimeScore },
        { new: true },
      );

      const user: User = {
        id: updatedUser.id,
        email: updatedUser.email,
        allTimeScore: updatedUser.allTimeScore,
      };

      this.logger.log('User by id found', { newAllTimeScore, playerId, user });

      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(SOMETHING_WENT_WRONG, error, {
        newAllTimeScore,
        playerId,
      });
      throw new InternalServerErrorException(SOMETHING_WENT_WRONG);
    }
  }
}
