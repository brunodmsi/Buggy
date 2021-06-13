import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListBugDevelopersService from '@modules/bugs/services/ListBugDevelopersService';

class ListBugDevelopersController {
  async index(request: Request, response: Response): Promise<Response> {
    const { bug_id } = request.params;

    const listBugDevelopers = container.resolve(ListBugDevelopersService);

    const bugDeveloper = await listBugDevelopers.execute({ bug_id });

    const developers = bugDeveloper.map(item => item.user);

    return response.json(developers);
  }
}

export default ListBugDevelopersController;
