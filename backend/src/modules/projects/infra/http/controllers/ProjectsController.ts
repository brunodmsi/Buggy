import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateProjectService from '@modules/projects/services/CreateProjectService';
import ListProjectService from '@modules/projects/services/ListProjectService';

class ProjectsController {
  async show(request: Request, response: Response): Promise<Response> {
    const { projectId } = request.params;

    const listProject = container.resolve(ListProjectService);

    const project = await listProject.execute({
      project_id: projectId,
    });

    return response.json(project);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const logoFile = request.file;

    const { name, description, url } = request.body;

    const createProject = container.resolve(CreateProjectService);

    const project = await createProject.execute({
      name,
      description,
      url,
      owner_id: user_id,
      logo: logoFile ? logoFile.filename : '',
    });

    return response.json(project);
  }
}

export default ProjectsController;
