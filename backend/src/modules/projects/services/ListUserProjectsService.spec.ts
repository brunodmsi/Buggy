import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeProjectsRepository from '../repositories/fakes/FakeProjectsRepository';
import AddUserToProjectService from './AddUserToProjectService';
import CreateProjectService from './CreateProjectService';
import ListUserProjectsService from './ListUserProjectsService';
import FakeUserProjectsRepository from '../repositories/fakes/FakeUserProjectsRepository';

let fakeProjectsRepository: FakeProjectsRepository;
let fakeUsersRepository: FakeUsersRepository;
let addUserToProject: AddUserToProjectService;
let createProject: CreateProjectService;
let listUserProjects: ListUserProjectsService;
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
    listUserProjects = new ListUserProjectsService(
      fakeUsersRepository,
      fakeUserProjectsRepository,
    );
  });

  it('should be able to list user projects', async () => {
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

    const listProjects = await listUserProjects.execute({
      user_id: user.id,
    });

    expect(listProjects).toEqual([add1]);
  });

  it('should not be able to list projects of non-existing user', async () => {
    await expect(
      listUserProjects.execute({
        user_id: 'non-existing-user',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
