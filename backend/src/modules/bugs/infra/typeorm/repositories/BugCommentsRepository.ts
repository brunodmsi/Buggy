import { Repository, getRepository } from 'typeorm';

import IBugCommentDTO from '@modules/bugs/dtos/IBugCommentDTO';
import BugComment from '@modules/bugs/infra/typeorm/entities/BugComment';
import IBugCommentsRepository from '@modules/bugs/repositories/IBugCommentsRepository';

class BugCommentsRepository implements IBugCommentsRepository {
  private ormRepository: Repository<BugComment>;

  constructor() {
    this.ormRepository = getRepository(BugComment);
  }

  public async findById(id: string): Promise<BugComment | undefined> {
    const bugComment = await this.ormRepository.findOne(id);

    return bugComment;
  }

  public async findAllByBugId(bug_id: string): Promise<BugComment[]> {
    const bugComments = await this.ormRepository.find({
      where: { bug_id },
      relations: ['user'],
      order: { created_at: 'DESC' },
    });

    return bugComments;
  }

  public async deleteById(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async create(bugCommentData: IBugCommentDTO): Promise<BugComment> {
    const bugComment = this.ormRepository.create(bugCommentData);

    await this.ormRepository.save(bugComment);

    return bugComment;
  }

  public async save(bugComment: BugComment): Promise<BugComment> {
    return this.ormRepository.save(bugComment);
  }
}

export default BugCommentsRepository;
