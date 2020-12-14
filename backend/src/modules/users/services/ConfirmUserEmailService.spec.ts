import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import ConfirmUserEmailService from './ConfirmUserEmailService';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let confirmUserEmail: ConfirmUserEmailService;

describe('ConfirmUserEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    confirmUserEmail = new ConfirmUserEmailService(
      fakeUsersRepository,
      fakeUserTokensRepository,
    );
  });

  it('should be able to confirm email', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@ex.com',
      password: '123123',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    await confirmUserEmail.execute({
      token,
    });

    const updatedUser = await fakeUsersRepository.findById(user.id);

    expect(updatedUser?.active).toBe(true);
  });

  it('should not be able to confirm email with non-existing token', async () => {
    await expect(
      confirmUserEmail.execute({
        token: 'non-existing-token',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to confirm email with non-existing user', async () => {
    const { token } = await fakeUserTokensRepository.generate(
      'non-existing-user',
    );

    await expect(
      confirmUserEmail.execute({
        token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to confirm email if its past more than three hours', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@ex.com',
      password: '123123',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementation(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 4);
    });

    await expect(
      confirmUserEmail.execute({
        token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
