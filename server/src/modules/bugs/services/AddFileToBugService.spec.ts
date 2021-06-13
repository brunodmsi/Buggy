import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeProjectsRepository from '@modules/projects/repositories/fakes/FakeProjectsRepository';
import CreateProjectService from '@modules/projects/services/CreateProjectService';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUserProjectsRepository from '@modules/projects/repositories/fakes/FakeUserProjectsRepository';
import FakeBugsRepository from '../repositories/fakes/FakeBugsRepository';
import FakeBugFilesRepository from '../repositories/fakes/FakeBugFilesRepository';
import AddFileToBugService from './AddFileToBugService';
import CreateBugService from './CreateBugService';

let fakeBugsRepository: FakeBugsRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeProjectsRepository: FakeProjectsRepository;
let fakeUserProjectsRepository: FakeUserProjectsRepository;
let fakeBugFilesRepository: FakeBugFilesRepository;
let fakeStorageProvider: FakeStorageProvider;
let addFileToBug: AddFileToBugService;
let createBug: CreateBugService;
let createProject: CreateProjectService;

describe('AddFileToBug', () => {
  beforeEach(() => {
    fakeBugsRepository = new FakeBugsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeProjectsRepository = new FakeProjectsRepository();
    fakeBugFilesRepository = new FakeBugFilesRepository();
    fakeStorageProvider = new FakeStorageProvider();
    fakeUserProjectsRepository = new FakeUserProjectsRepository();

    createProject = new CreateProjectService(
      fakeProjectsRepository,
      fakeUsersRepository,
      fakeUserProjectsRepository,
      fakeStorageProvider,
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
  });

  it('should be able to add file to bug', async () => {
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

    expect(bugFile).toHaveProperty('id');
  });

  it('should not be able to add file to non-existing bug', async () => {
    await expect(
      addFileToBug.execute({
        bug_id: 'non-existing-bug',
        bugFilename: 'avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
