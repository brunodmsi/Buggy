import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AddCommentToBugService from '@modules/bugs/services/AddCommentToBugService';

class BugCommentController {
  async create(request: Request, response: Response): Promise<Response> {
    const { bug_id } = request.params;
    const { message } = request.body;
    const user_id = request.user.id;

    const addCommentToBug = container.resolve(AddCommentToBugService);

    const bugComment = await addCommentToBug.execute({
      user_id,
      bug_id,
      message,
    });

    return response.json(bugComment);
  }
}

export default BugCommentController;
