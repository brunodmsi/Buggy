import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';

import Bug from '@modules/bugs/infra/typeorm/entities/Bug';

@Entity('listener_reports')
class ListenerReport {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  message: string;

  @Column()
  stack_where: string;

  @Column()
  stack_line: string;

  @Column()
  query: string;

  @Column()
  bug_id: string;

  @OneToOne(() => Bug, bug => bug.id)
  bug: Bug;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default ListenerReport;
