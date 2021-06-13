import { injectable, inject } from 'tsyringe';
import path from 'path';

import AppError from '@shared/errors/AppError';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

interface IRequest {
  user_id: string;
}

@injectable()
class ResendConfirmUserEmailService {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
    @inject('MailProvider') private mailProvider: IMailProvider,
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    const { token } = await this.userTokensRepository.generate(user_id);

    const confirmEmailTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'confirm_email.hbs',
    );

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[Buggy] Confirme seu e-mail',
      templateData: {
        file: confirmEmailTemplate,
        variables: {
          name: user.name,
          confirm_link: `${process.env.APP_WEB_URL}/confirm-email/token=${token}`,
        },
      },
    });
  }
}

export default ResendConfirmUserEmailService;
