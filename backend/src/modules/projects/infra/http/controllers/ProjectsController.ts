import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateProjectService from '@modules/projects/services/CreateProjectService';

class ProjectsController {
  async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { name, description, url } = request.body;

    const createProject = container.resolve(CreateProjectService);

    const project = await createProject.execute({
      name,
      description,
      url,
      owner_id: user_id,
    });

    return response.json(project);
  }
}

export default ProjectsController;
