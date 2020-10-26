import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListUserProjectsService from '@modules/projects/services/ListUserProjectsService';

class UserProjectsController {
  async index(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;

    const listUserProjects = container.resolve(ListUserProjectsService);

    const userProject = await listUserProjects.execute({
      user_id,
    });

    const projects = userProject.map(item => item.project);

    return response.json(projects);
  }
}

export default UserProjectsController;
