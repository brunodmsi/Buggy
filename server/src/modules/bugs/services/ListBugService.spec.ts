import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeProjectsRepository from '@modules/projects/repositories/fakes/FakeProjectsRepository';
import CreateProjectService from '@modules/projects/services/CreateProjectService';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUserProjectsRepository from '@modules/projects/repositories/fakes/FakeUserProjectsRepository';
import FakeBugsRepository from '../repositories/fakes/FakeBugsRepository';
import CreateBugService from './CreateBugService';
import ListBugService from './ListBugService';

let fakeProjectsRepository: FakeProjectsRepository;
let fakeUsersRepository: FakeUsersRepository;
let createProject: CreateProjectService;
let fakeBugsRepository: FakeBugsRepository;
let fakeStorageProvider: FakeStorageProvider;
let fakeUserProjectsRepository: FakeUserProjectsRepository;
let createBug: CreateBugService;
let listBug: ListBugService;

describe('ListDeveloperBugs', () => {
  beforeEach(() => {
    fakeProjectsRepository = new FakeProjectsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeBugsRepository = new FakeBugsRepository();
    fakeUserProjectsRepository = new FakeUserProjectsRepository();
    fakeStorageProvider = new FakeStorageProvider();

    listBug = new ListBugService(fakeBugsRepository);

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
  });

  it('should be able to list a bug', async () => {
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

    await expect(
      listBug.execute({
        bug_id: bug.id,
      }),
    ).toHaveProperty('id');
  });

  it('should not be able to list non-existing bug', async () => {
    await expect(
      listBug.execute({
        bug_id: 'non-existing-bug',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
