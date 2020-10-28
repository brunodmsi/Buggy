import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import BugChecklist from './BugChecklist';

@Entity('bug_checklist_items')
class BugChecklistItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  text: string;

  @Column({ default: false })
  done: boolean;

  @Column()
  checklist_id: string;

  @ManyToOne(() => BugChecklist)
  @JoinColumn({ name: 'checklist_id' })
  bugChecklist: BugChecklist;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default BugChecklistItem;
