import { uuid } from 'uuidv4';

import ICreateBugDTO from '@modules/bugs/dtos/ICreateBugDTO';
import Bug from '@modules/bugs/infra/typeorm/entities/Bug';
import IBugsRepository from '../IBugsRepository';

class FakeBugsRepository implements IBugsRepository {
  private bugs: Bug[] = [];

  public async findById(id: string): Promise<Bug | undefined> {
    const findBug = this.bugs.find(bug => bug.id === id);

    return findBug;
  }

  public async findAllByProjectId(id: string): Promise<Bug[]> {
    const findBugs = this.bugs.filter(bug => bug.project_id === id);

    return findBugs;
  }

  public async create(bugData: ICreateBugDTO): Promise<Bug> {
    const bug = new Bug();

    Object.assign(bug, { id: uuid() }, bugData);

    this.bugs.push(bug);

    return bug;
  }

  public async save(bug: Bug): Promise<Bug> {
    const findIndex = this.bugs.findIndex(findBug => findBug.id === bug.id);

    this.bugs[findIndex] = bug;

    return bug;
  }
}

export default FakeBugsRepository;
