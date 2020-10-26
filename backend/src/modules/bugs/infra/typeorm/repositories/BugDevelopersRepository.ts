import { Repository, getRepository } from 'typeorm';

import IBugDeveloperDTO from '@modules/bugs/dtos/IBugDeveloperDTO';
import BugDeveloper from '@modules/bugs/infra/typeorm/entities/BugDeveloper';
import IBugDevelopersRepository from '@modules/bugs/repositories/IBugDevelopersRepository';

class BugDevelopersRepository implements IBugDevelopersRepository {
  private ormRepository: Repository<BugDeveloper>;

  constructor() {
    this.ormRepository = getRepository(BugDeveloper);
  }

  public async listDeveloperBugsById(user_id: string): Promise<BugDeveloper[]> {
    const users = await this.ormRepository.find({
      where: { user_id },
      relations: ['bug'],
    });

    return users;
  }

  public async listBugDevelopersById(bug_id: string): Promise<BugDeveloper[]> {
    const bugs = await this.ormRepository.find({
      where: { bug_id },
      relations: ['user'],
    });

    return bugs;
  }

  public async checkIfDeveloperIsAlreadyAddedToBug({
    user_id,
    bug_id,
  }: IBugDeveloperDTO): Promise<boolean> {
    const developerInBug = await this.ormRepository.findOne({
      where: { user_id, bug_id },
    });

    return !!developerInBug;
  }

  public async create(
    bugDeveloperData: IBugDeveloperDTO,
  ): Promise<BugDeveloper> {
    const bugDeveloper = this.ormRepository.create(bugDeveloperData);

    await this.ormRepository.save(bugDeveloper);

    return bugDeveloper;
  }

  public async save(bugDeveloper: BugDeveloper): Promise<BugDeveloper> {
    return this.ormRepository.save(bugDeveloper);
  }
}

export default BugDevelopersRepository;
