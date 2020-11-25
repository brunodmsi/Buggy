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
  error_query: string;

  @Column()
  request_body: string;

  @Column()
  request_method: string;
  
  @Column()
  request_url_protocol: string;

  @Column()
  request_url: string;

  @Column()
  request_url_path: string;

  @Column()
  request_headers: string;

  @Column()
  request_query: string;

  @Column()
  request_params: string;

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
