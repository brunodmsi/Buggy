import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IBugsRepository from '../repositories/IBugsRepository';
import IBugFilesRepository from '../repositories/IBugFilesRepository';

interface IRequest {
  bug_file_id: string;
}

@injectable()
class DeleteBugFileService {
  constructor(
    @inject('BugsRepository')
    private bugsRepository: IBugsRepository,
    @inject('BugFilesRepository')
    private bugFilesRepository: IBugFilesRepository,
    @inject('StorageProvider') private storageProvider: IStorageProvider,
  ) {}

  public async execute({ bug_file_id }: IRequest): Promise<void> {
    const bugFile = await this.bugFilesRepository.findById(bug_file_id);

    if (!bugFile) {
      throw new AppError('BugFile not found');
    }

    await this.storageProvider.deleteFile(bugFile.filename);
    await this.bugFilesRepository.deleteById(bugFile.id);
  }
}

export default DeleteBugFileService;
