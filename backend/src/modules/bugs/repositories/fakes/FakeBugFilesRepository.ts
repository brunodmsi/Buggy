import { uuid } from 'uuidv4';

import IBugFilesRepository from '@modules/bugs/repositories/IBugFilesRepository';
import IBugFileDTO from '@modules/bugs/dtos/IBugFileDTO';

import BugFile from '@modules/bugs/infra/typeorm/entities/BugFile';

class FakeBugFilesRepository implements IBugFilesRepository {
  private bugFiles: BugFile[] = [];

  public async findById(id: string): Promise<BugFile | undefined> {
    const findBugFile = this.bugFiles.find(bugFile => bugFile.id === id);

    return findBugFile;
  }

  public async findAllByBugId(id: string): Promise<BugFile[]> {
    const findBugFiles = this.bugFiles.filter(bugFile => bugFile.bug_id === id);

    return findBugFiles;
  }

  public async create(bugFileData: IBugFileDTO): Promise<BugFile> {
    const bugFile = new BugFile();

    Object.assign(bugFile, { id: uuid() }, bugFileData);

    this.bugFiles.push(bugFile);

    return bugFile;
  }

  public async save(bugFile: BugFile): Promise<BugFile> {
    const findIndex = this.bugFiles.findIndex(
      findBugFiles => findBugFiles.id === bugFile.id,
    );

    this.bugFiles[findIndex] = bugFile;

    return bugFile;
  }
}

export default FakeBugFilesRepository;
