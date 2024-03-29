import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import Project from '@modules/projects/infra/typeorm/entities/Project';
import ListenerReport from '@modules/listener_reports/infra/typeorm/entities/ListenerReport';
import BugDeveloper from './BugDeveloper';
import BugChecklist from './BugChecklist';
import BugComment from './BugComment';
import BugFile from './BugFile';

@Entity('bugs')
class Bug {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  type: string;

  @Column()
  priority: string;

  @Column('integer')
  group: number;

  @Column('integer')
  status: number;

  @Column('boolean')
  delivered: boolean;

  @Column('boolean')
  archived: boolean;

  @Column('timestamp with time zone')
  date_limit: Date;

  @Column()
  project_id: string;

  @Column()
  listener_report_id: string;

  @OneToOne(() => ListenerReport, listenerReport => listenerReport.bug_id)
  listener_report: ListenerReport;

  @ManyToOne(() => Project)
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @OneToMany(() => BugDeveloper, bugDeveloper => bugDeveloper.bug)
  developers: BugDeveloper[];

  @OneToMany(() => BugFile, bugFile => bugFile.bug)
  files: BugFile[];

  @OneToMany(() => BugChecklist, bugChecklist => bugChecklist.bug)
  checklists: BugChecklist[];

  @OneToMany(() => BugComment, bugComment => bugComment.bug)
  comments: BugComment[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Bug;
