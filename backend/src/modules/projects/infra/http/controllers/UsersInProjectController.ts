import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListUsersInProjectService from '@modules/projects/services/ListUsersInProjectService';

class UsersInProjectController {
  async index(request: Request, response: Response): Promise<Response> {
    const { project_id } = request.params;

    const listUsersInProject = container.resolve(ListUsersInProjectService);

    const userProject = await listUsersInProject.execute({
      project_id,
    });

    return response.json(userProject);
  }
}

export default UsersInProjectController;
