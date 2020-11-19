import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import uploadConfig from '@config/upload';

import { Expose } from 'class-transformer';

import Bug from '@modules/bugs/infra/typeorm/entities/Bug';

@Entity('projects')
class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  url: string;

  @Column()
  owner_id: string;

  @Column()
  logo: string;

  @Column()
  listener_key: string;

  @OneToMany(() => Bug, bug => bug.project)
  bugs: Bug[];

  @Expose({ name: 'logo_url' })
  getLogoUrl(): string | null {
    if (!this.logo) return null;

    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.logo}`;

      case 's3':
        return `https://${uploadConfig.config.aws.bucket}.s3.us-east-2.amazonaws.com/${this.logo}`;

      default:
        return null;
    }
  }

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Project;
