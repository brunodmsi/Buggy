import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AddDeveloperToBugService from '@modules/bugs/services/AddDeveloperToBugService';

class BugDeveloperController {
  async create(request: Request, response: Response): Promise<Response> {
    const { bug_id } = request.params;
    const { user_id } = request.body;

    const addDeveloperToBug = container.resolve(AddDeveloperToBugService);

    const bugDeveloper = await addDeveloperToBug.execute({ user_id, bug_id });

    return response.json(bugDeveloper);
  }
}

export default BugDeveloperController;
