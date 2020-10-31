import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IProjectsRepository from '../repositories/IProjectsRepository';
import IUserProjectsRepository from '../repositories/IUserProjectsRepository';

import Project from '../infra/typeorm/entities/Project';

interface IRequest {
  name: string;
  description: string;
  url: string;
  owner_id: string;
  logo?: string;
}

@injectable()
class CreateProjectService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,
    @inject('UsersRepository') private usersRepository: IUsersRepository,
    @inject('UserProjectsRepository')
    private userProjectsRepository: IUserProjectsRepository,
  ) {}

  public async execute({
    name,
    description,
    url,
    owner_id,
    logo,
  }: IRequest): Promise<Project> {
    const user = await this.usersRepository.findById(owner_id);

    if (!user) {
      throw new AppError('User not found');
    }

    const project = await this.projectsRepository.create({
      name,
      description,
      url,
      owner_id: user.id,
      logo,
    });

    await this.userProjectsRepository.create({
      project_id: project.id,
      user_id: project.owner_id,
    });

    return project;
  }
}

export default CreateProjectService;
