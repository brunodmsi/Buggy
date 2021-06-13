import BugDeveloper from '../infra/typeorm/entities/BugDeveloper';

import IBugDeveloperDTO from '../dtos/IBugDeveloperDTO';

export default interface IBugDevelopersRepository {
  listDeveloperBugsById(id: string): Promise<BugDeveloper[]>;
  listBugDevelopersById(id: string): Promise<BugDeveloper[]>;

  checkIfDeveloperIsAlreadyAddedToBug(data: IBugDeveloperDTO): Promise<boolean>;

  create(data: IBugDeveloperDTO): Promise<BugDeveloper>;
  save(bug: BugDeveloper): Promise<BugDeveloper>;
}
