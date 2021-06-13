import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListBugStatusByUserProjectsService from '@modules/projects/services/ListBugStatusByUserProjectsService';
import ListBugTypeByUserProjectsService from '@modules/projects/services/ListBugTypeByUserProjectsService';
import ListBugFinishedAndOpenBugsByUserProjectsService from '@modules/projects/services/ListBugFinishedAndOpenBugsByUserProjectsService';
import ListUserProjectsService from '@modules/projects/services/ListUserProjectsService';
import ListDeveloperBugsService from '@modules/bugs/services/ListDeveloperBugsService';

class UserDashboardController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listBugStatusByUserProjects = container.resolve(
      ListBugStatusByUserProjectsService,
    );
    const listBugTypeByUserProjects = container.resolve(
      ListBugTypeByUserProjectsService,
    );
    const listDeveloperBugs = container.resolve(ListDeveloperBugsService);
    const listUserProjects = container.resolve(ListUserProjectsService);
    const listBugFinishedAndOpenBugsByUserProjects = container.resolve(
      ListBugFinishedAndOpenBugsByUserProjectsService,
    );

    const graphData = await listBugFinishedAndOpenBugsByUserProjects.execute({
      user_id,
    });

    const statuses = await listBugStatusByUserProjects.execute({
      user_id,
    });

    const types = await listBugTypeByUserProjects.execute({
      user_id,
    });

    const assignedToUser = await listDeveloperBugs.execute({
      user_id,
    });

    const projects = await listUserProjects.execute({ user_id });

    const bugs = assignedToUser.map(assign => assign.bug);

    return response.json({
      statuses,
      types,
      assignedToUser: classToClass(bugs),
      projects: classToClass(projects),
      graph: graphData,
    });
  }
}

export default UserDashboardController;
