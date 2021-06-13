import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IProjectsRepository from '../repositories/IProjectsRepository';
import IUserProjectsRepository from '../repositories/IUserProjectsRepository';

import UserProject from '../infra/typeorm/entities/UserProject';

interface IRequest {
  user_email: string;
  project_id: string;
  auth_user_id: string;
}

@injectable()
class AddUserToProjectService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,
    @inject('UsersRepository') private usersRepository: IUsersRepository,
    @inject('UserProjectsRepository')
    private userProjectsRepository: IUserProjectsRepository,
  ) {}

  public async execute({
    user_email,
    project_id,
    auth_user_id,
  }: IRequest): Promise<UserProject> {
    const user = await this.usersRepository.findByEmail(user_email);

    if (!user) {
      throw new AppError('User not found');
    }

    const project = await this.projectsRepository.findById(project_id);

    if (!project) {
      throw new AppError('Project not found');
    }

    if (project.owner_id !== auth_user_id) {
      throw new AppError('Only project owner can add new user');
    }

    const isUserAlreadyAdded = await this.userProjectsRepository.checkIfUserIsAlreadyAddedToProject(
      { project_id: project.id, user_id: user.id },
    );

    if (isUserAlreadyAdded) {
      throw new AppError('User is already in this project');
    }

    const userProject = await this.userProjectsRepository.create({
      project_id: project.id,
      user_id: user.id,
    });

    return userProject;
  }
}

export default AddUserToProjectService;
