import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateBugService from '@modules/bugs/services/CreateBugService';

class BugsController {
  async create(request: Request, response: Response): Promise<Response> {
    const bugData = request.body;

    const createBug = container.resolve(CreateBugService);

    const bug = await createBug.execute(bugData);

    return response.json(bug);
  }
}

export default BugsController;
