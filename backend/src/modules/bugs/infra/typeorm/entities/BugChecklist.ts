import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Bug from './Bug';

@Entity('bug_checklists')
class BugChecklist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('simple-json')
  items?: { text: string; done: boolean };

  @Column()
  bug_id: string;

  @ManyToOne(() => Bug)
  @JoinColumn({ name: 'bug_id' })
  bug: Bug;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default BugChecklist;
