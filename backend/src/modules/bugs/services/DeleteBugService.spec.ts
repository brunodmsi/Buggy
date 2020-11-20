import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeProjectsRepository from '@modules/projects/repositories/fakes/FakeProjectsRepository';
import CreateProjectService from '@modules/projects/services/CreateProjectService';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUserProjectsRepository from '@modules/projects/repositories/fakes/FakeUserProjectsRepository';
import FakeBugsRepository from '../repositories/fakes/FakeBugsRepository';
import DeleteBugService from './DeleteBugService';
import CreateBugService from './CreateBugService';

let fakeBugsRepository: FakeBugsRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeProjectsRepository: FakeProjectsRepository;
let fakeStorageProvider: FakeStorageProvider;
let deleteBug: DeleteBugService;
let fakeUserProjectsRepository: FakeUserProjectsRepository;
let createBug: CreateBugService;
let createProject: CreateProjectService;

describe('DeleteBugFile', () => {
  beforeEach(() => {
    fakeBugsRepository = new FakeBugsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeProjectsRepository = new FakeProjectsRepository();
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

    deleteBug = new DeleteBugService(fakeBugsRepository);
  });

  it('should be able to delete bug', async () => {
    const deleteById = jest.spyOn(fakeBugsRepository, 'deleteById');

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

    await deleteBug.execute({
      bug_id: bug.id,
    });

    expect(deleteById).toHaveBeenCalledWith(bug.id);
  });

  it('should not be able to delete bug if it does not exist', async () => {
    await expect(
      deleteBug.execute({
        bug_id: 'non-existing-bug',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
