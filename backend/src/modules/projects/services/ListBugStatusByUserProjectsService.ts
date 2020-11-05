import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Bug from '@modules/bugs/infra/typeorm/entities/Bug';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUserProjectsRepository from '@modules/projects/repositories/IUserProjectsRepository';

export interface IParsedStatus {
  [key: number]: {
    bugs: Bug[];
  };
}

interface IRequest {
  user_id: string;
}

@injectable()
class ListBugByUserProjectsService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UserProjectsRepository')
    private userProjectsRepository: IUserProjectsRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<IParsedStatus> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    const userProjects = await this.userProjectsRepository.findUserProjectsById(
      user.id,
    );

    const toParse = userProjects.map(userProject => userProject.project.bugs);

    const bugs: Bug[] = [];
    toParse.map(bug => bugs.push(...bug));

    const statuses: IParsedStatus = {};
    bugs.forEach(bug => {
      if (!statuses[bug.group]) statuses[bug.group] = { bugs: [bug] };
      else statuses[bug.group] = { bugs: [...statuses[bug.group].bugs, bug] };
    });

    return statuses;
  }
}

export default ListBugByUserProjectsService;
