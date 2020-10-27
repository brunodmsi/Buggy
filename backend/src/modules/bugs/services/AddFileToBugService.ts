import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IBugsRepository from '../repositories/IBugsRepository';
import IBugFilesRepository from '../repositories/IBugFilesRepository';

import BugFile from '../infra/typeorm/entities/BugFile';

interface IRequest {
  bugFilename: string;
  bug_id: string;
}

@injectable()
class AddFileToBugService {
  constructor(
    @inject('BugsRepository')
    private bugsRepository: IBugsRepository,
    @inject('BugFilesRepository')
    private bugFilesRepository: IBugFilesRepository,
    @inject('StorageProvider') private storageProvider: IStorageProvider,
  ) {}

  public async execute({ bug_id, bugFilename }: IRequest): Promise<BugFile> {
    const bug = await this.bugsRepository.findById(bug_id);

    if (!bug) {
      throw new AppError('Bug not found');
    }

    const filename = await this.storageProvider.saveFile(bugFilename);

    console.log(filename);

    const bugFile = await this.bugFilesRepository.create({ bug_id, filename });

    return bugFile;
  }
}

export default AddFileToBugService;
