import BugChecklist from '../infra/typeorm/entities/BugChecklist';

import IBugChecklistDTO from '../dtos/IBugChecklistDTO';

export default interface IBugCommentsRepository {
  findById(id: string): Promise<BugChecklist | undefined>;
  findAllByBugId(id: string): Promise<BugChecklist[]>;
  deleteById(id: string): Promise<void>;

  create(data: IBugChecklistDTO): Promise<BugChecklist>;
  save(bugChecklist: BugChecklist): Promise<BugChecklist>;
}
