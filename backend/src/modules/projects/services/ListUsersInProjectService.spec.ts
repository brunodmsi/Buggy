import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeProjectsRepository from '../repositories/fakes/FakeProjectsRepository';
import AddUserToProjectService from './AddUserToProjectService';
import CreateProjectService from './CreateProjectService';
import ListUsersInProjectService from './ListUsersInProjectService';
import FakeUserProjectsRepository from '../repositories/fakes/FakeUserProjectsRepository';

let fakeProjectsRepository: FakeProjectsRepository;
let fakeUsersRepository: FakeUsersRepository;
let addUserToProject: AddUserToProjectService;
let createProject: CreateProjectService;
let listUsersInProject: ListUsersInProjectService;
let fakeUserProjectsRepository: FakeUserProjectsRepository;

describe('ListUsersInProject', () => {
  beforeEach(() => {
    fakeProjectsRepository = new FakeProjectsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserProjectsRepository = new FakeUserProjectsRepository();

    createProject = new CreateProjectService(
      fakeProjectsRepository,
      fakeUsersRepository,
    );
    addUserToProject = new AddUserToProjectService(
      fakeProjectsRepository,
      fakeUsersRepository,
      fakeUserProjectsRepository,
    );
    listUsersInProject = new ListUsersInProjectService(
      fakeProjectsRepository,
      fakeUsersRepository,
      fakeUserProjectsRepository,
    );
  });

  it('should be able to list users in a project', async () => {
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

    const add1 = await addUserToProject.execute({
      user_email: user.email,
      project_id: project.id,
      auth_user_id: user.id,
    });

    const listUsers = await listUsersInProject.execute({
      project_id: project.id,
    });

    expect(listUsers).toEqual([add1]);
  });

  it('should not be able to list users of non-existing project', async () => {
    await expect(
      listUsersInProject.execute({
        project_id: 'non-existing-project',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
