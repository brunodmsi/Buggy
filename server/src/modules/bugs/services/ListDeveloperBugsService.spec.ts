import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeProjectsRepository from '@modules/projects/repositories/fakes/FakeProjectsRepository';
import CreateProjectService from '@modules/projects/services/CreateProjectService';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUserProjectsRepository from '@modules/projects/repositories/fakes/FakeUserProjectsRepository';
import FakeBugsRepository from '../repositories/fakes/FakeBugsRepository';
import FakeBugDevelopersRepository from '../repositories/fakes/FakeBugDevelopersRepository';
import CreateBugService from './CreateBugService';
import AddDeveloperToBugService from './AddDeveloperToBugService';
import ListDeveloperBugsService from './ListDeveloperBugsService';

let fakeProjectsRepository: FakeProjectsRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeBugsRepository: FakeBugsRepository;
let fakeBugDevelopersRepository: FakeBugDevelopersRepository;
let fakeStorageProvider: FakeStorageProvider;
let fakeUserProjectsRepository: FakeUserProjectsRepository;
let addDeveloperToBug: AddDeveloperToBugService;
let listDeveloperBugs: ListDeveloperBugsService;
let createProject: CreateProjectService;
let createBug: CreateBugService;

describe('ListDeveloperBugs', () => {
  beforeEach(() => {
    fakeProjectsRepository = new FakeProjectsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeBugsRepository = new FakeBugsRepository();
    fakeBugDevelopersRepository = new FakeBugDevelopersRepository();
    fakeUserProjectsRepository = new FakeUserProjectsRepository();
    fakeStorageProvider = new FakeStorageProvider();

    listDeveloperBugs = new ListDeveloperBugsService(
      fakeBugDevelopersRepository,
      fakeUsersRepository,
    );

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

    addDeveloperToBug = new AddDeveloperToBugService(
      fakeBugsRepository,
      fakeUsersRepository,
      fakeBugDevelopersRepository,
    );
  });

  it('should be able to list developer assigned bugs', async () => {
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

    const user = await fakeUsersRepository.create({
      name: 'John One',
      email: 'johnone@example.com',
      password: '123123',
    });

    const add1 = await addDeveloperToBug.execute({
      user_id: user.id,
      bug_id: bug.id,
    });

    const listBugs = await listDeveloperBugs.execute({ user_id: user.id });

    await expect(listBugs).toEqual([add1]);
  });

  it('should not be able to list bugs of non-existing user', async () => {
    await expect(
      listDeveloperBugs.execute({
        user_id: 'non-existing-user',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
