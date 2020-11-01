import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeProjectsRepository from '@modules/projects/repositories/fakes/FakeProjectsRepository';
import CreateProjectService from '@modules/projects/services/CreateProjectService';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUserProjectsRepository from '@modules/projects/repositories/fakes/FakeUserProjectsRepository';
import FakeBugsRepository from '../repositories/fakes/FakeBugsRepository';
import FakeBugCommentsRepository from '../repositories/fakes/FakeBugCommentsRepository';
import CreateBugService from './CreateBugService';
import AddCommentToBugService from './AddCommentToBugService';
import ListBugCommentsService from './ListBugCommentsService';

let fakeProjectsRepository: FakeProjectsRepository;
let fakeUsersRepository: FakeUsersRepository;
let createProject: CreateProjectService;
let fakeBugsRepository: FakeBugsRepository;
let fakeStorageProvider: FakeStorageProvider;
let fakeUserProjectsRepository: FakeUserProjectsRepository;
let fakeBugCommentsRepository: FakeBugCommentsRepository;
let createBug: CreateBugService;
let addCommentToBug: AddCommentToBugService;
let listBugComments: ListBugCommentsService;

describe('ListBugComments', () => {
  beforeEach(() => {
    fakeProjectsRepository = new FakeProjectsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeBugsRepository = new FakeBugsRepository();
    fakeBugCommentsRepository = new FakeBugCommentsRepository();
    fakeBugCommentsRepository = new FakeBugCommentsRepository();
    fakeStorageProvider = new FakeStorageProvider();

    listBugComments = new ListBugCommentsService(
      fakeBugCommentsRepository,
      fakeBugsRepository,
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

    addCommentToBug = new AddCommentToBugService(
      fakeBugsRepository,
      fakeUsersRepository,
      fakeBugCommentsRepository,
    );
  });

  it('should be able to list comments of a bug', async () => {
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

    const add1 = await addCommentToBug.execute({
      user_id: user.id,
      bug_id: bug.id,
      message: 'Ok, vou dar uma olhada',
    });

    const listComments = await listBugComments.execute({ bug_id: bug.id });

    await expect(listComments).toEqual([add1]);
  });

  it('should not be able to list comments of non-existing bug', async () => {
    await expect(
      listBugComments.execute({
        bug_id: 'non-existing-bug',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
