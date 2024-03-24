import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserMongoDBRepositoryImplementation } from './database/mongodb/user.mongodb.repository';

describe('UserService', () => {
  let service: UserService;
  let userRepo: UserMongoDBRepositoryImplementation;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserMongoDBRepositoryImplementation,
          useValue: {
            findUserByEmail: jest.fn(),
            createUser: jest.fn(),
            findUserById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepo = module.get<UserMongoDBRepositoryImplementation>(
      UserMongoDBRepositoryImplementation,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUser', () => {
    const user = {
      email: 'amce@gmail.com',
      id: '123',
      password: 'password',
      allTimeScore: 1,
    };
    it('should throw User with email already exists error', async () => {
      jest.spyOn(userRepo, 'findUserByEmail').mockResolvedValueOnce(user);

      try {
        await service.createUser({
          email: user.email,
          password: user.password,
        });
      } catch (error) {
        expect(error.message).toBe('User with email already exists');
      }
    });
    it('should create user', async () => {
      jest.spyOn(userRepo, 'createUser').mockResolvedValueOnce({
        email: user.email,
        id: user.id,
        allTimeScore: 1,
      });

      try {
        const createdUser = await service.createUser({
          email: user.email,
          password: user.password,
        });

        expect(userRepo.createUser).toBeCalledWith({
          email: user.email,
          // Making sure that password is hashed
          password: expect.not.stringMatching(user.password),
        });

        expect(createdUser.email).toEqual(user.email);
      } catch (error) {
        expect(error).toBeUndefined();
      }
    });
  });
});
