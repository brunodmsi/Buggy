import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Bug from '@modules/bugs/infra/typeorm/entities/Bug';
import IBugsRepository from '@modules/bugs/repositories/IBugsRepository';
import IProjectsRepository from '../repositories/IProjectsRepository';

interface IRequest {
  project_id: string;
}

@injectable()
class ListUserProjectsService {
  constructor(
    @inject('BugsRepository')
    private bugsRepository: IBugsRepository,
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,
  ) {}

  public async execute({ project_id }: IRequest): Promise<Bug[]> {
    const project = await this.projectsRepository.findById(project_id);

    if (!project) {
      throw new AppError('Project not found');
    }

    const bugs = await this.bugsRepository.findAllByProjectId(project_id);

    return bugs;
  }
}

export default ListUserProjectsService;
