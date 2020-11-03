import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeProjectsRepository from '@modules/projects/repositories/fakes/FakeProjectsRepository';
import CreateProjectService from '@modules/projects/services/CreateProjectService';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUserProjectsRepository from '@modules/projects/repositories/fakes/FakeUserProjectsRepository';
import FakeBugsRepository from '../repositories/fakes/FakeBugsRepository';
import FakeBugCommentsRepository from '../repositories/fakes/FakeBugCommentsRepository';
import AddCommentToBugService from './AddCommentToBugService';
import DeleteBugCommentService from './DeleteBugCommentService';
import CreateBugService from './CreateBugService';

let fakeBugsRepository: FakeBugsRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeProjectsRepository: FakeProjectsRepository;
let fakeBugCommentsRepository: FakeBugCommentsRepository;
let fakeStorageProvider: FakeStorageProvider;
let addCommentToBug: AddCommentToBugService;
let deleteBugComment: DeleteBugCommentService;
let fakeUserProjectsRepository: FakeUserProjectsRepository;
let createBug: CreateBugService;
let createProject: CreateProjectService;

describe('DeleteBugComment', () => {
  beforeEach(() => {
    fakeBugsRepository = new FakeBugsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeProjectsRepository = new FakeProjectsRepository();
    fakeBugCommentsRepository = new FakeBugCommentsRepository();
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

    addCommentToBug = new AddCommentToBugService(
      fakeBugsRepository,
      fakeUsersRepository,
      fakeBugCommentsRepository,
    );

    deleteBugComment = new DeleteBugCommentService(fakeBugCommentsRepository);
  });

  it('should be able to delete comment', async () => {
    const deleteById = jest.spyOn(fakeBugCommentsRepository, 'deleteById');

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

    const bugComment = await addCommentToBug.execute({
      bug_id: bug.id,
      message: 'Oh hi there',
      user_id: owner.id,
    });

    await deleteBugComment.execute({
      bug_comment_id: bugComment.id,
      user_id: owner.id,
      bug_id: bug.id,
    });

    expect(deleteById).toHaveBeenCalledWith(bugComment.id);
  });

  it('should not be able to delete comment if it does not exist', async () => {
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
      deleteBugComment.execute({
        bug_comment_id: 'non-existing-bug-comment',
        user_id: owner.id,
        bug_id: bug.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to delete comment if user is not the comment creator', async () => {
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

    const bugComment = await addCommentToBug.execute({
      bug_id: bug.id,
      message: 'Oh hi there',
      user_id: owner.id,
    });

    await expect(
      deleteBugComment.execute({
        bug_comment_id: bugComment.id,
        user_id: 'not-creator-id',
        bug_id: bug.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to delete file if comment doesnt belong to given bug', async () => {
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

    const bugComment = await addCommentToBug.execute({
      bug_id: bug.id,
      message: 'Oh hi there',
      user_id: owner.id,
    });

    await expect(
      deleteBugComment.execute({
        bug_comment_id: bugComment.id,
        user_id: owner.id,
        bug_id: 'another-bug-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
