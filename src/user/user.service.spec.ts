import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import * as sgMail from '@sendgrid/mail';

jest.mock('@sendgrid/mail', () => ({
  setApiKey: jest.fn(),
  send: jest.fn(),
}));

describe('UserService', () => {
  let service: UserService;

  const mockRepository = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest.fn().mockImplementation((user) => Promise.resolve({ id: Date.now(), ...user })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should register a user', async () => {
    const dto = { username: 'Test', email: 'test@example.com' };
    const user = await service.register(dto.username, dto.email);

    expect(user).toBeDefined();
    expect(user.username).toEqual(dto.username);
    expect(user.email).toEqual(dto.email);
    expect(mockRepository.create).toHaveBeenCalledWith({
      username: dto.username,
      email: dto.email,
      verificationToken: expect.any(String),
    });
    expect(mockRepository.save).toHaveBeenCalled();
  });

  it('should send a verification email', async () => {
    const sendSpy = jest.spyOn(sgMail, 'send');
    await service.sendVerificationEmail('test@example.com', 'token');
    expect(sendSpy).toHaveBeenCalled();
  });
});