import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IProjectsRepository from '../repositories/IProjectsRepository';
import IUserProjectsRepository from '../repositories/IUserProjectsRepository';

import UserProject from '../infra/typeorm/entities/UserProject';

interface IRequest {
  project_id: string;
}

@injectable()
class ListUsersInProjectService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,
    @inject('UserProjectsRepository')
    private userProjectsRepository: IUserProjectsRepository,
  ) {}

  public async execute({ project_id }: IRequest): Promise<UserProject[]> {
    const project = await this.projectsRepository.findById(project_id);

    if (!project) {
      throw new AppError('Project not found');
    }

    const listUsers = await this.userProjectsRepository.findProjectUsersById(
      project.id,
    );

    return listUsers;
  }
}

export default ListUsersInProjectService;
