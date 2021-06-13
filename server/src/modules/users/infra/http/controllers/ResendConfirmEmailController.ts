import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ResendConfirmUserEmailService from '@modules/users/services/ResendConfirmUserEmailService';

export default class ResendConfirmEmailController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const resendConfirmUserEmail = container.resolve(
      ResendConfirmUserEmailService,
    );

    await resendConfirmUserEmail.execute({
      user_id,
    });

    return response.status(204).json();
  }
}
