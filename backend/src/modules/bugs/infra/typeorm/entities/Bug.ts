import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @Column('integer')
  group: number;

  @Column('integer')
  status: number;

  @Column('timestamp with time zone')
  date_limit: Date;

  @Column()
  project_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Bug;
