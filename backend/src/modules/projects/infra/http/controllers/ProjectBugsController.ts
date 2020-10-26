import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProjectBugsService from '@modules/projects/services/ListProjectBugsService';

class ProjectBugsController {
  async index(request: Request, response: Response): Promise<Response> {
    const { project_id } = request.params;

    const listProjectBugs = container.resolve(ListProjectBugsService);

    const bugs = await listProjectBugs.execute({ project_id });

    return response.json(bugs);
  }
}

export default ProjectBugsController;
