import BugComment from '../infra/typeorm/entities/BugComment';

import IBugCommentDTO from '../dtos/IBugCommentDTO';

export default interface IBugCommentsRepository {
  findById(id: string): Promise<BugComment | undefined>;
  deleteById(id: string): Promise<void>;

  create(data: IBugCommentDTO): Promise<BugComment>;
  save(bug: BugComment): Promise<BugComment>;
}
