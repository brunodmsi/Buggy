import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Bug from '@modules/bugs/infra/typeorm/entities/Bug';
import IProjectsRepository from '../repositories/IProjectsRepository';

interface IRequest {
  project_id: string;
}

@injectable()
class ListProjectBugsService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,
  ) {}

  public async execute({ project_id }: IRequest): Promise<Bug[]> {
    const project = await this.projectsRepository.findByIdWithBugs(project_id);

    if (!project) {
      throw new AppError('Project not found');
    }

    return project.bugs;
  }
}

export default ListProjectBugsService;
