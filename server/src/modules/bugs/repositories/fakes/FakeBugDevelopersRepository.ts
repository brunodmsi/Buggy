import { uuid } from 'uuidv4';

import IBugDevelopersRepository from '@modules/bugs/repositories/IBugDevelopersRepository';
import IBugDeveloperDTO from '@modules/bugs/dtos/IBugDeveloperDTO';

import BugDeveloper from '@modules/bugs/infra/typeorm/entities/BugDeveloper';

class FakeBugDevelopersRepository implements IBugDevelopersRepository {
  private bugDevelopers: BugDeveloper[] = [];

  public async listBugDevelopersById(bug_id: string): Promise<BugDeveloper[]> {
    const findBugDevelopers = this.bugDevelopers.filter(
      bugDeveloper => bugDeveloper.bug_id === bug_id,
    );

    return findBugDevelopers;
  }

  public async listDeveloperBugsById(user_id: string): Promise<BugDeveloper[]> {
    const findDeveloperBugs = this.bugDevelopers.filter(
      bugDeveloper => bugDeveloper.user_id === user_id,
    );

    return findDeveloperBugs;
  }

  public async checkIfDeveloperIsAlreadyAddedToBug({
    bug_id,
    user_id,
  }: IBugDeveloperDTO): Promise<boolean> {
    const findBug = this.bugDevelopers.filter(
      bugDeveloper => bugDeveloper.bug_id === bug_id,
    );

    const findUserInBug = findBug.find(
      bugDeveloper => bugDeveloper.user_id === user_id,
    );

    return !!findUserInBug;
  }

  public async create(
    bugDeveloperData: IBugDeveloperDTO,
  ): Promise<BugDeveloper> {
    const bugDeveloper = new BugDeveloper();

    Object.assign(bugDeveloper, { id: uuid() }, bugDeveloperData);

    this.bugDevelopers.push(bugDeveloper);

    return bugDeveloper;
  }

  public async save(bugDeveloper: BugDeveloper): Promise<BugDeveloper> {
    const findIndex = this.bugDevelopers.findIndex(
      findBugDevelopers => findBugDevelopers.id === bugDeveloper.id,
    );

    this.bugDevelopers[findIndex] = bugDeveloper;

    return bugDeveloper;
  }
}

export default FakeBugDevelopersRepository;
