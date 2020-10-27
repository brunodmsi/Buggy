import BugFile from '../infra/typeorm/entities/BugFile';

import IBugFileDTO from '../dtos/IBugFileDTO';

export default interface IBugsRepository {
  findById(id: string): Promise<BugFile | undefined>;
  findAllByBugId(id: string): Promise<BugFile[]>;

  create(data: IBugFileDTO): Promise<BugFile>;
  save(bugFile: BugFile): Promise<BugFile>;
  deleteById(id: string): Promise<void>;
}
