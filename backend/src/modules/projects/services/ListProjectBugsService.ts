import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Bug from '@modules/bugs/infra/typeorm/entities/Bug';
import Project from '../infra/typeorm/entities/Project';
import IProjectsRepository from '../repositories/IProjectsRepository';
import sortProjectBugsForKanban from '../utils/sortProjectBugsForKanban';

interface IRequest {
  project_id: string;
}

export interface IParsedBug {
  [key: string]: {
    name: string;
    items: Array<Bug>;
  };
}

@injectable()
class ListProjectBugsService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,
  ) {}

  public async execute({
    project_id,
  }: IRequest): Promise<{ project: Project; bugs: IParsedBug }> {
    const project = await this.projectsRepository.findByIdWithBugs(project_id);

    if (!project) {
      throw new AppError('Project not found');
    }

    const unarchivedBugs = project.bugs.filter(bug => !bug.archived);

    const bugs = sortProjectBugsForKanban(unarchivedBugs);

    return { project, bugs };
  }
}

export default ListProjectBugsService;
