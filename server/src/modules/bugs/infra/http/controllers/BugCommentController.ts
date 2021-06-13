import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AddCommentToBugService from '@modules/bugs/services/AddCommentToBugService';
import DeleteBugCommentService from '@modules/bugs/services/DeleteBugCommentService';

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

  async destroy(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { bug_comment_id, bug_id } = request.params;

    const deleteBugComment = container.resolve(DeleteBugCommentService);

    await deleteBugComment.execute({ bug_comment_id, user_id, bug_id });

    return response.status(204).send();
  }
}

export default BugCommentController;
