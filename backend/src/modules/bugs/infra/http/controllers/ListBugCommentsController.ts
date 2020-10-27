import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListBugCommentsService from '@modules/bugs/services/ListBugCommentsService';

class ListBugCommentsController {
  async index(request: Request, response: Response): Promise<Response> {
    const { bug_id } = request.params;

    const listBugComments = container.resolve(ListBugCommentsService);

    const bugComments = await listBugComments.execute({
      bug_id,
    });

    return response.json(bugComments);
  }
}

export default ListBugCommentsController;
