import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeProjectsRepository from '@modules/projects/repositories/fakes/FakeProjectsRepository';
import CreateProjectService from '@modules/projects/services/CreateProjectService';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeBugsRepository from '../repositories/fakes/FakeBugsRepository';
import FakeBugFilesRepository from '../repositories/fakes/FakeBugFilesRepository';
import AddFileToBugService from './AddFileToBugService';
import DeleteBugFileService from './DeleteBugFileService';
import CreateBugService from './CreateBugService';

let fakeBugsRepository: FakeBugsRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeProjectsRepository: FakeProjectsRepository;
let fakeBugFilesRepository: FakeBugFilesRepository;
let fakeStorageProvider: FakeStorageProvider;
let addFileToBug: AddFileToBugService;
let deleteBugFile: DeleteBugFileService;
let createBug: CreateBugService;
let createProject: CreateProjectService;

describe('DeleteBugFile', () => {
  beforeEach(() => {
    fakeBugsRepository = new FakeBugsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeProjectsRepository = new FakeProjectsRepository();
    fakeBugFilesRepository = new FakeBugFilesRepository();
    fakeStorageProvider = new FakeStorageProvider();

    createProject = new CreateProjectService(
      fakeProjectsRepository,
      fakeUsersRepository,
    );

    createBug = new CreateBugService(
      fakeBugsRepository,
      fakeProjectsRepository,
    );

    addFileToBug = new AddFileToBugService(
      fakeBugsRepository,
      fakeBugFilesRepository,
      fakeStorageProvider,
    );

    deleteBugFile = new DeleteBugFileService(
      fakeBugsRepository,
      fakeBugFilesRepository,
      fakeStorageProvider,
    );
  });

  it('should be able to delete file', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');
    const deleteById = jest.spyOn(fakeBugFilesRepository, 'deleteById');

    const owner = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123123',
    });

    const project = await createProject.execute({
      name: 'Scient',
      description: 'A new way of opening a bank account',
      url: 'https://scient.demasi.dev',
      owner_id: owner.id,
    });

    const bug = await createBug.execute({
      title: 'Erro na responsividade',
      description: 'Div está dando overflow na rota X',
      type: 'WEB',
      project_id: project.id,
      group: 0,
      status: 0,
      date_limit: new Date(2020, 8, 20, 11, 0),
    });

    const bugFile = await addFileToBug.execute({
      bugFilename: 'bug.jpg',
      bug_id: bug.id,
    });

    await deleteBugFile.execute({
      bug_file_id: bugFile.id,
    });

    expect(deleteFile).toHaveBeenCalledWith(bugFile.filename);
    expect(deleteById).toHaveBeenCalledWith(bugFile.id);
  });

  it('should not be able to delete file if it does not exist', async () => {
    await expect(
      deleteBugFile.execute({
        bug_file_id: 'non-existing-bug-file',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
