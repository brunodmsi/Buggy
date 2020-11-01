import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeProjectsRepository from '@modules/projects/repositories/fakes/FakeProjectsRepository';
import CreateProjectService from '@modules/projects/services/CreateProjectService';
import FakeUserProjectsRepository from '@modules/projects/repositories/fakes/FakeUserProjectsRepository';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeBugsRepository from '../repositories/fakes/FakeBugsRepository';
import FakeBugDevelopersRepository from '../repositories/fakes/FakeBugDevelopersRepository';
import AddDeveloperToBugService from './AddDeveloperToBugService';
import CreateBugService from './CreateBugService';

let fakeBugsRepository: FakeBugsRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeProjectsRepository: FakeProjectsRepository;
let fakeBugDevelopersRepository: FakeBugDevelopersRepository;
let fakeUserProjectsRepository: FakeUserProjectsRepository;
let fakeStorageProvider: FakeStorageProvider;
let addDeveloperToBug: AddDeveloperToBugService;
let createBug: CreateBugService;
let createProject: CreateProjectService;

describe('AddDeveloperToBug', () => {
  beforeEach(() => {
    fakeBugsRepository = new FakeBugsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeProjectsRepository = new FakeProjectsRepository();
    fakeBugDevelopersRepository = new FakeBugDevelopersRepository();
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

    addDeveloperToBug = new AddDeveloperToBugService(
      fakeBugsRepository,
      fakeUsersRepository,
      fakeBugDevelopersRepository,
    );
  });

  it('should be able to add a developer to bug', async () => {
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

    const bugDeveloper = await addDeveloperToBug.execute({
      user_id: user.id,
      bug_id: bug.id,
    });

    expect(bugDeveloper).toHaveProperty('id');
  });

  it('should not be able to add non-existing user', async () => {
    const owner = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123123',
    });

    const project = await fakeProjectsRepository.create({
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
      addDeveloperToBug.execute({
        user_id: 'non-existing-user',
        bug_id: bug.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to add an user to a non-existing bug', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123123',
    });

    await expect(
      addDeveloperToBug.execute({
        user_id: user.id,
        bug_id: 'non-existing-bug',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to add the same developer twice', async () => {
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

    await addDeveloperToBug.execute({
      user_id: user.id,
      bug_id: bug.id,
    });

    await expect(
      addDeveloperToBug.execute({
        user_id: user.id,
        bug_id: bug.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
