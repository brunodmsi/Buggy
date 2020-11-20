import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateBugService from '@modules/bugs/services/CreateBugService';
import DeleteBugService from '@modules/bugs/services/DeleteBugService';

class BugsController {
  async create(request: Request, response: Response): Promise<Response> {
    const bugData = request.body;

    const createBug = container.resolve(CreateBugService);

    const bug = await createBug.execute(bugData);

    return response.json(bug);
  }

  async destroy(request: Request, response: Response): Promise<Response> {
    const { bug_id } = request.params;

    const deleteBug = container.resolve(DeleteBugService);

    await deleteBug.execute({ bug_id });

    return response.status(204).send();
  }
}

export default BugsController;
