import AppError from '@shared/errors/AppError';

import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import ResendConfirmUserEmailService from './ResendConfirmUserEmailService';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeMailProvider: FakeMailProvider;
let resendConfirmUserEmail: ResendConfirmUserEmailService;

describe('ResendConfirmUserEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeMailProvider = new FakeMailProvider();

    resendConfirmUserEmail = new ResendConfirmUserEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepository,
    );
  });

  it('should be able to resend email confirmation', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@ex.com',
      password: '123123',
    });

    await resendConfirmUserEmail.execute({
      user_id: user.id,
    });

    const updatedUser = await fakeUsersRepository.findById(user.id);

    expect(updatedUser?.active).toBe(true);
  });

  it('should not be able to confirm email with non-existing user id', async () => {
    await expect(
      resendConfirmUserEmail.execute({
        user_id: 'non-existing-user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
