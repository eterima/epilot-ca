import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDTO } from './dtos/create-user.dto';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/auth.guard';
import { RequestWithUser } from 'src/global.types';

@Controller('users')
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(private userService: UserService) {}
  @Post()
  async createUser(@Body() createUserDTO: CreateUserDTO) {
    const createdUser = await this.userService.createUser(createUserDTO);
    return createdUser;
  }

  @UseGuards(AuthGuard)
  @Get('/self')
  async self(@Request() req: RequestWithUser) {
    this.logger.log('Getting self', { user: req.user });

    const userId = req.user.id;
    const user = await this.userService.getUserById(userId);
    return user;
  }
}
