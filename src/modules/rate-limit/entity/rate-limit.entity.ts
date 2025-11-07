import { BlockStatus } from 'src/modules/rate-limit/enums/block-status.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('rate_limit_records')
@Index(['identifier', 'endpoint'], { unique: true })
export class RateLimitRecord {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  identifier: string;

  @Column({ type: 'varchar', length: 100 })
  endpoint: string;

  @Column({ default: 0 })
  violation_count: number;

  @Column({ type: 'timestamptz' })
  window_start_at: Date;

  @Column({ default: 0 })
  requests_in_window: number;

  @Column({
    type: 'enum',
    enum: BlockStatus,
    default: BlockStatus.None,
  })
  block_status: BlockStatus;

  @Column({ type: 'timestamptz', nullable: true })
  block_expires_at: Date | null;

  @Column({ type: 'timestamptz', nullable: true })
  violation_count_reset_at: Date | null;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}
