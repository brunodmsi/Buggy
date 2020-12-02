/* eslint-disable import/no-duplicates */
import { injectable, inject } from 'tsyringe';
import { format, isAfter } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import AppError from '@shared/errors/AppError';
import Bug from '@modules/bugs/infra/typeorm/entities/Bug';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUserProjectsRepository from '@modules/projects/repositories/IUserProjectsRepository';

export interface IParsedBugs {
  [key: string]: {
    open: number;
    closed: number;
  };
}

interface IRequest {
  user_id: string;
}

@injectable()
class ListBugFinishedAndOpenBugsByUserProjectsService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UserProjectsRepository')
    private userProjectsRepository: IUserProjectsRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<IParsedBugs> {
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

    const filteredDateBugs = bugs.filter(bug => {
      const thisDateLastYear = new Date();
      thisDateLastYear.setFullYear(thisDateLastYear.getFullYear() - 1);

      if (isAfter(bug.created_at, thisDateLastYear)) {
        return true;
      }

      return false;
    });

    const parsedBugs = {} as IParsedBugs;
    filteredDateBugs.forEach(bug => {
      const month = format(bug.created_at, 'MMMM', { locale: ptBR });

      if (!parsedBugs[month]) {
        parsedBugs[month] = {
          closed: 0,
          open: 0,
        };
      }

      const isClosed = bug.archived || bug.group === 3;

      if (isClosed) parsedBugs[month].closed += 1;
      if (!isClosed) parsedBugs[month].open += 1;
    });

    return parsedBugs;
  }
}

export default ListBugFinishedAndOpenBugsByUserProjectsService;
