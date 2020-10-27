import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Expose } from 'class-transformer';

import uploadConfig from '@config/upload';

import Bug from './Bug';

@Entity('bug_files')
class BugFile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  filename: string;

  @Column()
  bug_id: string;

  @ManyToOne(() => Bug)
  @JoinColumn({ name: 'bug_id' })
  bug: Bug;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'filename' })
  getFilenameUrl(): string | null {
    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.filename}`;

      case 's3':
        return `https://${uploadConfig.config.aws.bucket}.s3.us-east-2.amazonaws.com/${this.filename}`;

      default:
        return null;
    }
  }
}

export default BugFile;
