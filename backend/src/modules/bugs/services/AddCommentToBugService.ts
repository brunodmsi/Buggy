import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IBugsRepository from '../repositories/IBugsRepository';
import IBugCommentsRepository from '../repositories/IBugCommentsRepository';

import BugComment from '../infra/typeorm/entities/BugComment';

interface IRequest {
  user_id: string;
  bug_id: string;
  message: string;
}

@injectable()
class AddCommentToBugService {
  constructor(
    @inject('BugsRepository')
    private bugsRepository: IBugsRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('BugCommentsRepository')
    private bugCommentsRepository: IBugCommentsRepository,
  ) {}

  public async execute({
    bug_id,
    user_id,
    message,
  }: IRequest): Promise<BugComment> {
    const bug = await this.bugsRepository.findById(bug_id);

    if (!bug) {
      throw new AppError('Bug not found');
    }

    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    const bugComment = await this.bugCommentsRepository.create({
      user_id: user.id,
      bug_id: bug.id,
      message,
    });

    return bugComment;
  }
}

export default AddCommentToBugService;
