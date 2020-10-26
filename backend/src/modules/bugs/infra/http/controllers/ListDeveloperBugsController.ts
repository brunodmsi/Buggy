import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListDeveloperBugsService from '@modules/bugs/services/ListDeveloperBugsService';

class ListDeveloperBugsController {
  async index(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;

    const listDeveloperBugs = container.resolve(ListDeveloperBugsService);

    const bugDeveloper = await listDeveloperBugs.execute({ user_id });

    const bugs = bugDeveloper.map(item => item.bug);

    return response.json(bugs);
  }
}

export default ListDeveloperBugsController;
