import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Project from '../infra/typeorm/entities/Project';
import IProjectsRepository from '../repositories/IProjectsRepository';

interface IRequest {
  project_id: string;
}

@injectable()
class ListProjectService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,
  ) {}

  public async execute({ project_id }: IRequest): Promise<Project | undefined> {
    const project = await this.projectsRepository.findByIdWithBugs(project_id);

    if (!project) {
      throw new AppError('Project not found');
    }

    return project;
  }
}

export default ListProjectService;
