import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUserProjectsRepository from '../repositories/fakes/FakeUserProjectsRepository';
import FakeProjectsRepository from '../repositories/fakes/FakeProjectsRepository';
import CreateProjectService from './CreateProjectService';
import ListProjectService from './ListProjectService';

let fakeProjectsRepository: FakeProjectsRepository;
let fakeUsersRepository: FakeUsersRepository;
let createProject: CreateProjectService;
let fakeStorageProvider: FakeStorageProvider;
let fakeUserProjectsRepository: FakeUserProjectsRepository;
let listProject: ListProjectService;

describe('ListProjectBugs', () => {
  beforeEach(() => {
    fakeProjectsRepository = new FakeProjectsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();

    listProject = new ListProjectService(fakeProjectsRepository);

    createProject = new CreateProjectService(
      fakeProjectsRepository,
      fakeUsersRepository,
      fakeUserProjectsRepository,
      fakeStorageProvider,
    );
  });

  it('should be able to list project', async () => {
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

    await expect(
      listProject.execute({
        project_id: project.id,
      }),
    ).toEqual(project);
  });

  it('should not be able to list non-existing project', async () => {
    await expect(
      listProject.execute({
        project_id: 'non-existing-project',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
