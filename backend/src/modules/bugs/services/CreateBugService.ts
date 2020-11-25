import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IProjectsRepository from '@modules/projects/repositories/IProjectsRepository';
import IBugsRepository from '../repositories/IBugsRepository';

import Bug from '../infra/typeorm/entities/Bug';

interface IRequest {
  title: string;
  description: string;
  type: string;
  priority: string;
  group: number;
  status: number;
  date_limit?: Date;
  project_id: string;
}

@injectable()
class CreateBugService {
  constructor(
    @inject('BugsRepository')
    private bugsRepository: IBugsRepository,
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,
  ) {}

  public async execute({
    title,
    description,
    type,
    priority,
    date_limit,
    group,
    status,
    project_id,
  }: IRequest): Promise<Bug> {
    const project = await this.projectsRepository.findById(project_id);

    if (!project) {
      throw new AppError('Project not found');
    }

    const bug = await this.bugsRepository.create({
      title,
      description,
      type,
      group,
      status,
      date_limit,
      project_id,
      priority,
    });

    return bug;
  }
}

export default CreateBugService;
