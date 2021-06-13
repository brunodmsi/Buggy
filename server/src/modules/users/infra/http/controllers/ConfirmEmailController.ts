import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ConfirmUserEmailService from '@modules/users/services/ConfirmUserEmailService';

export default class ConfirmEmailController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { token } = request.body;

    const confirmUserEmail = container.resolve(ConfirmUserEmailService);

    await confirmUserEmail.execute({
      token,
    });

    return response.status(204).json();
  }
}
