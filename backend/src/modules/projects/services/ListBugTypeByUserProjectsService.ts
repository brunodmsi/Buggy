import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Bug from '@modules/bugs/infra/typeorm/entities/Bug';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUserProjectsRepository from '@modules/projects/repositories/IUserProjectsRepository';

export interface IParsedType {
  [key: string]: {
    bugs: Bug[];
  };
}

interface IRequest {
  user_id: string;
}

@injectable()
class ListBugTypeByUserProjectsService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UserProjectsRepository')
    private userProjectsRepository: IUserProjectsRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<IParsedType> {
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

    const types: IParsedType = {};
    bugs.forEach(bug => {
      if (!types[bug.type]) types[bug.type] = { bugs: [bug] };
      else types[bug.type] = { bugs: [...types[bug.type].bugs, bug] };
    });

    return types;
  }
}

export default ListBugTypeByUserProjectsService;
