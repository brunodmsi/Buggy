import { uuid } from 'uuidv4';

import IBugCommentsRepository from '@modules/bugs/repositories/IBugCommentsRepository';
import IBugCommentDTO from '@modules/bugs/dtos/IBugCommentDTO';

import BugComment from '@modules/bugs/infra/typeorm/entities/BugComment';

class FakeBugCommentsRepository implements IBugCommentsRepository {
  private bugComments: BugComment[] = [];

  public async findById(id: string): Promise<BugComment | undefined> {
    const findBugComment = this.bugComments.find(
      bugComment => bugComment.id === id,
    );

    return findBugComment;
  }

  public async deleteById(id: string): Promise<void> {
    const findIndex = this.bugComments.findIndex(
      bugComment => bugComment.id === id,
    );

    this.bugComments.splice(findIndex, 1);
  }

  public async create(bugCommentData: IBugCommentDTO): Promise<BugComment> {
    const bugComment = new BugComment();

    Object.assign(bugComment, { id: uuid() }, bugCommentData);

    this.bugComments.push(bugComment);

    return bugComment;
  }

  public async save(bugComment: BugComment): Promise<BugComment> {
    const findIndex = this.bugComments.findIndex(
      findBugComments => findBugComments.id === bugComment.id,
    );

    this.bugComments[findIndex] = bugComment;

    return bugComment;
  }
}

export default FakeBugCommentsRepository;
