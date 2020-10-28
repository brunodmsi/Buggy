import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import Bug from './Bug';
import BugChecklistItem from './BugChecklistItem';

@Entity('bug_checklists')
class BugChecklist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  bug_id: string;

  @ManyToOne(() => Bug)
  @JoinColumn({ name: 'bug_id' })
  bug: Bug;

  @OneToMany(
    () => BugChecklistItem,
    bugChecklistItem => bugChecklistItem.bugChecklist,
  )
  bugChecklistItem: BugChecklistItem;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default BugChecklist;
