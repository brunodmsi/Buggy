import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUserProjectsRepository from '../repositories/fakes/FakeUserProjectsRepository';
import FakeProjectsRepository from '../repositories/fakes/FakeProjectsRepository';
import CreateProjectService from './CreateProjectService';

let fakeProjectsRepository: FakeProjectsRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeUserProjectsRepository: FakeUserProjectsRepository;
let fakeStorageProvider: FakeStorageProvider;
let createProject: CreateProjectService;

describe('CreateProject', () => {
  beforeEach(() => {
    fakeProjectsRepository = new FakeProjectsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserProjectsRepository = new FakeUserProjectsRepository();
    fakeStorageProvider = new FakeStorageProvider();

    createProject = new CreateProjectService(
      fakeProjectsRepository,
      fakeUsersRepository,
      fakeUserProjectsRepository,
      fakeStorageProvider,
    );
  });

  it('should be able to create a new project', async () => {
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

    expect(project).toHaveProperty('id');
  });

  it('should not be able to create a project with non-existing user', async () => {
    await expect(
      createProject.execute({
        name: 'Scient',
        description: 'A new way of opening a bank account',
        url: 'https://scient.demasi.dev',
        owner_id: 'non-existing-user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
