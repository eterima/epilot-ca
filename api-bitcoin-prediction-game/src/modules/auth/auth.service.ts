import * as bcrypt from 'bcrypt';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDTO } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { SOMETHING_WENT_WRONG } from '../../errors/custom-errors-messages';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}
  async login(loginDTO: LoginDTO) {
    try {
      this.logger.log('Logging user started', { email: loginDTO.email });

      const existingUser = await this.userService.getUserByEmail(
        loginDTO.email,
      );

      if (!existingUser) {
        throw new NotFoundException('User not found');
      }

      this.logger.log('Validating password', { email: loginDTO.email });

      const isValidPassword = await bcrypt.compare(
        loginDTO.password,
        existingUser.password,
      );

      if (!isValidPassword) {
        throw new UnauthorizedException('Invalid credentials');
      }

      this.logger.log('Password validated', { email: loginDTO.email });

      const payload = { id: existingUser.id, email: existingUser.email };

      const token = { accessToken: await this.jwtService.signAsync(payload) };

      this.logger.log('Token successfully created', { email: loginDTO.email });

      return token;
    } catch (error) {
      if (
        error instanceof UnauthorizedException ||
        error instanceof NotFoundException
      ) {
        this.logger.log(error.message, { email: loginDTO.email });
        throw error;
      }

      this.logger.error(SOMETHING_WENT_WRONG, { email: loginDTO.email });
      throw new InternalServerErrorException(SOMETHING_WENT_WRONG);
    }
  }
}
