import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListProjectBugsService from '@modules/projects/services/ListProjectBugsService';

class ProjectBugsController {
  async index(request: Request, response: Response): Promise<Response> {
    const { project_id } = request.params;

    const listProjectBugs = container.resolve(ListProjectBugsService);

    const { project, bugs } = await listProjectBugs.execute({ project_id });

    return response.json({
      project: classToClass(project),
      bugs: classToClass(bugs),
    });
  }
}

export default ProjectBugsController;
