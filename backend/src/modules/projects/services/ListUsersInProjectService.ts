import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import IProjectsRepository from '../repositories/IProjectsRepository';
import IUserProjectsRepository from '../repositories/IUserProjectsRepository';

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

  public async execute({ project_id }: IRequest): Promise<User[]> {
    const project = await this.projectsRepository.findById(project_id);

    if (!project) {
      throw new AppError('Project not found');
    }

    const listUsers = await this.userProjectsRepository.findProjectUsersById(
      project.id,
    );

    const users = listUsers.map(item => item.user);

    return users;
  }
}

export default ListUsersInProjectService;
