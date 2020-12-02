import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';

import UserProject from '@modules/projects/infra/typeorm/entities/UserProject';
import Project from '@modules/projects/infra/typeorm/entities/Project';

import BugDeveloper from '@modules/bugs/infra/typeorm/entities/BugDeveloper';
import Bug from '@modules/bugs/infra/typeorm/entities/Bug';

import uploadConfig from '@config/upload';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  avatar: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => UserProject, userProject => userProject.user)
  userProjects: UserProject[];

  @Expose({ name: 'projects' })
  getUserProjects(): Project[] {
    if (!this.userProjects) return [];

    const projects = this.userProjects.map(userProject => userProject.project);
    return projects;
  }

  @OneToMany(() => BugDeveloper, bugDeveloper => bugDeveloper.user)
  bugDevelopers: BugDeveloper[];

  @Expose({ name: 'bugs' })
  getUserBugs(): Bug[] {
    if (!this.bugDevelopers) return [];

    const bugs = this.bugDevelopers.map(bugDeveloper => bugDeveloper.bug);
    return bugs;
  }

  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string | null {
    if (!this.avatar) return null;

    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.avatar}`;

      case 's3':
        return `https://${uploadConfig.config.aws.bucket}.s3.us-east-2.amazonaws.com/${this.avatar}`;

      default:
        return null;
    }
  }
}

export default User;
