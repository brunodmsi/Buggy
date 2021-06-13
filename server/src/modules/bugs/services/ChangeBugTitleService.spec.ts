import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeProjectsRepository from '@modules/projects/repositories/fakes/FakeProjectsRepository';
import CreateProjectService from '@modules/projects/services/CreateProjectService';
import FakeUserProjectsRepository from '@modules/projects/repositories/fakes/FakeUserProjectsRepository';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeBugsRepository from '../repositories/fakes/FakeBugsRepository';
import ChangeBugTitleService from './ChangeBugTitleService';
import CreateBugService from './CreateBugService';

let fakeBugsRepository: FakeBugsRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeProjectsRepository: FakeProjectsRepository;
let fakeUserProjectsRepository: FakeUserProjectsRepository;
let fakeStorageProvider: FakeStorageProvider;
let changeBugTitle: ChangeBugTitleService;
let createBug: CreateBugService;
let createProject: CreateProjectService;

describe('ChangeBugTitle', () => {
  beforeEach(() => {
    fakeBugsRepository = new FakeBugsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeProjectsRepository = new FakeProjectsRepository();
    fakeUserProjectsRepository = new FakeUserProjectsRepository();
    fakeStorageProvider = new FakeStorageProvider();

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

    changeBugTitle = new ChangeBugTitleService(fakeBugsRepository);
  });

  it('should be able to change a bug description', async () => {
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

    const newTitle = 'Erro nas responsividades';

    await changeBugTitle.execute({
      bug_id: bug.id,
      title: newTitle,
    });

    expect(bug.title).toEqual(newTitle);
  });

  it('should not be able to change a description of non-existing bug', async () => {
    await expect(
      changeBugTitle.execute({
        bug_id: 'non-existing-bug',
        title: 'Titulo novo nova',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
