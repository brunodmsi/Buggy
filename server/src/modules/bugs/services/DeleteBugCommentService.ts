import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IBugCommentsRepository from '../repositories/IBugCommentsRepository';

interface IRequest {
  bug_comment_id: string;
  bug_id: string;
  user_id: string;
}

@injectable()
class DeleteBugCommentService {
  constructor(
    @inject('BugCommentsRepository')
    private bugCommentsRepository: IBugCommentsRepository,
  ) {}

  public async execute({
    bug_comment_id,
    user_id,
    bug_id,
  }: IRequest): Promise<void> {
    const bugComment = await this.bugCommentsRepository.findById(
      bug_comment_id,
    );

    if (!bugComment) {
      throw new AppError('BugComment not found');
    }

    if (bugComment.user.id !== user_id) {
      throw new AppError('User is not the comment creator');
    }

    if (bugComment.bug.id !== bug_id) {
      throw new AppError('BugComment does not to belong to given Bug');
    }

    await this.bugCommentsRepository.deleteById(bugComment.id);
  }
}

export default DeleteBugCommentService;
