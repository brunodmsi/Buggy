import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeBugsRepository from '@modules/bugs/repositories/fakes/FakeBugsRepository';
import CreateBugService from '@modules/bugs/services/CreateBugService';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUserProjectsRepository from '../repositories/fakes/FakeUserProjectsRepository';
import FakeProjectsRepository from '../repositories/fakes/FakeProjectsRepository';
import CreateProjectService from './CreateProjectService';
import ListBugTypeByUserProjectsService from './ListBugTypeByUserProjectsService';

let fakeProjectsRepository: FakeProjectsRepository;
let fakeUsersRepository: FakeUsersRepository;
let createProject: CreateProjectService;
let fakeBugsRepository: FakeBugsRepository;
let fakeStorageProvider: FakeStorageProvider;
let fakeUserProjectsRepository: FakeUserProjectsRepository;
let createBug: CreateBugService;
let listBugTypeByUserProjects: ListBugTypeByUserProjectsService;

describe('ListBugTypeByUserProjects', () => {
  beforeEach(() => {
    fakeProjectsRepository = new FakeProjectsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeBugsRepository = new FakeBugsRepository();
    fakeStorageProvider = new FakeStorageProvider();
    fakeUserProjectsRepository = new FakeUserProjectsRepository();

    listBugTypeByUserProjects = new ListBugTypeByUserProjectsService(
      fakeUsersRepository,
      fakeUserProjectsRepository,
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
  });

  it('should be able to list user projects bugs statuses', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123123',
    });

    const project = await createProject.execute({
      name: 'Scient',
      description: 'A new way of opening a bank account',
      url: 'https://scient.demasi.dev',
      owner_id: user.id,
    });

    const bug = await createBug.execute({
      title: 'Erro na responsividade',
      description: 'Div está dando overflow na rota X',
      type: 'web',
      project_id: project.id,
      group: 0,
      status: 0,
      date_limit: new Date(2020, 8, 20, 11, 0),
    });

    Object.assign(project, { bugs: [bug] });

    const listBugs = await listBugTypeByUserProjects.execute({
      user_id: user.id,
    });

    expect(listBugs).toEqual({
      web: {
        bugs: [bug],
      },
    });
  });

  it('should not be able to list user bugs statuses of non-existing user', async () => {
    await expect(
      listBugTypeByUserProjects.execute({
        user_id: 'non-existing-user',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
