import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeProjectsRepository from '../repositories/fakes/FakeProjectsRepository';
import AddUserToProjectService from './AddUserToProjectService';
import CreateProjectService from './CreateProjectService';
import FakeUserProjectsRepository from '../repositories/fakes/FakeUserProjectsRepository';

let fakeProjectsRepository: FakeProjectsRepository;
let fakeUsersRepository: FakeUsersRepository;
let addUserToProject: AddUserToProjectService;
let createProject: CreateProjectService;
let fakeUserProjectsRepository: FakeUserProjectsRepository;

describe('AddUserToProject', () => {
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
  });

  it('should be able to add an user to a project', async () => {
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

    const userProject = await addUserToProject.execute({
      user_email: user.email,
      project_id: project.id,
      auth_user_id: user.id,
    });

    expect(userProject).toHaveProperty('id');
  });

  it('should not be able add non-existing user to project', async () => {
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
      addUserToProject.execute({
        user_email: 'non-existing-user',
        project_id: project.id,
        auth_user_id: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able add user to non-existing project', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123123',
    });

    await expect(
      addUserToProject.execute({
        user_email: user.email,
        project_id: 'project-id',
        auth_user_id: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to add user if auth user is not the project owner', async () => {
    const ownerUser = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123123',
    });

    const project = await createProject.execute({
      name: 'Scient',
      description: 'A new way of opening a bank account',
      url: 'https://scient.demasi.dev',
      owner_id: ownerUser.id,
    });

    const notOwnerUser = await fakeUsersRepository.create({
      name: 'John One',
      email: 'johnone@example.com',
      password: '123123',
    });

    await expect(
      addUserToProject.execute({
        user_email: notOwnerUser.id,
        project_id: project.id,
        auth_user_id: notOwnerUser.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to add an already added user', async () => {
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

    const user = await fakeUsersRepository.create({
      name: 'John One',
      email: 'johnone@example.com',
      password: '123123',
    });

    await addUserToProject.execute({
      user_email: user.email,
      project_id: project.id,
      auth_user_id: owner.id,
    });

    await expect(
      addUserToProject.execute({
        user_email: user.email,
        project_id: project.id,
        auth_user_id: owner.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to add new user unless you are the owner', async () => {
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

    const user = await fakeUsersRepository.create({
      name: 'John One',
      email: 'johnone@example.com',
      password: '123123',
    });

    await addUserToProject.execute({
      user_email: user.email,
      project_id: project.id,
      auth_user_id: owner.id,
    });

    await expect(
      addUserToProject.execute({
        user_email: user.email,
        project_id: project.id,
        auth_user_id: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
