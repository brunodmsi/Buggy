import Bug from '../infra/typeorm/entities/Bug';

import ICreateBugDTO from '../dtos/ICreateBugDTO';

export default interface IBugsRepository {
  findById(id: string): Promise<Bug | undefined>;
  findAllByProjectId(id: string): Promise<Bug[]>;

  create(data: ICreateBugDTO): Promise<Bug>;
  save(bug: Bug): Promise<Bug>;

  deleteById(id: string): Promise<void>;
}
