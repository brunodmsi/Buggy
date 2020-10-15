import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinColumn,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import Project from '@modules/projects/infra/typeorm/entities/Project';

@Entity('user_projects')
class UserProject {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @Column()
  project_id: string;

  @ManyToMany(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToMany(() => Project)
  @JoinColumn({ name: 'project_id' })
  project: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default UserProject;
