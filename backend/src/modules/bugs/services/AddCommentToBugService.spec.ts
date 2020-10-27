import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeProjectsRepository from '@modules/projects/repositories/fakes/FakeProjectsRepository';
import CreateProjectService from '@modules/projects/services/CreateProjectService';
import FakeBugsRepository from '../repositories/fakes/FakeBugsRepository';
import FakeBugCommentsRepository from '../repositories/fakes/FakeBugCommentsRepository';
import AddCommentToBugService from './AddCommentToBugService';
import CreateBugService from './CreateBugService';

let fakeBugsRepository: FakeBugsRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeProjectsRepository: FakeProjectsRepository;
let fakeBugCommentsRepository: FakeBugCommentsRepository;
let addCommentToBug: AddCommentToBugService;
let createBug: CreateBugService;
let createProject: CreateProjectService;

describe('AddCommentToBug', () => {
  beforeEach(() => {
    fakeBugsRepository = new FakeBugsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeProjectsRepository = new FakeProjectsRepository();
    fakeBugCommentsRepository = new FakeBugCommentsRepository();

    createProject = new CreateProjectService(
      fakeProjectsRepository,
      fakeUsersRepository,
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

  it('should be able to add a comment to bug', async () => {
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

    const bugComment = await addCommentToBug.execute({
      user_id: user.id,
      bug_id: bug.id,
      message: 'Ok, vou dar uma olhada',
    });

    expect(bugComment).toHaveProperty('id');
  });

  it('should not be able to add comment from non-existing user', async () => {
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
      addCommentToBug.execute({
        user_id: 'non-existing-user',
        bug_id: bug.id,
        message: 'Ok, não existo',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to add a comment to a non-existing bug', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123123',
    });

    await expect(
      addCommentToBug.execute({
        user_id: user.id,
        bug_id: 'non-existing-bug',
        message: 'Ok, o bug não existe',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
