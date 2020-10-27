import { Repository, getRepository } from 'typeorm';

import IBugFileDTO from '@modules/bugs/dtos/IBugFileDTO';
import BugFile from '@modules/bugs/infra/typeorm/entities/BugFile';
import IBugFilesRepository from '@modules/bugs/repositories/IBugFilesRepository';

class BugFilesRepository implements IBugFilesRepository {
  private ormRepository: Repository<BugFile>;

  constructor() {
    this.ormRepository = getRepository(BugFile);
  }

  public async findById(id: string): Promise<BugFile | undefined> {
    const bugFile = await this.ormRepository.findOne(id);

    return bugFile;
  }

  public async findAllByBugId(bug_id: string): Promise<BugFile[]> {
    const bugFiles = await this.ormRepository.find({
      where: { bug_id },
    });

    return bugFiles;
  }

  public async create(bugFileData: IBugFileDTO): Promise<BugFile> {
    const bugFile = this.ormRepository.create(bugFileData);

    await this.ormRepository.save(bugFile);

    return bugFile;
  }

  public async save(bugFile: BugFile): Promise<BugFile> {
    return this.ormRepository.save(bugFile);
  }

  public async deleteById(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default BugFilesRepository;
