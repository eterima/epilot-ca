import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserMongoDBRepositoryImplementation } from './database/mongodb/user.mongodb.repository';

@Module({
  providers: [
    UserService,
    {
      provide: UserMongoDBRepositoryImplementation,
      useClass: UserMongoDBRepositoryImplementation,
    },
  ],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
