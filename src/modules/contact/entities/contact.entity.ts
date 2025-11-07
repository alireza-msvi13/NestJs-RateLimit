import {
  Entity,
  Column,
  CreateDateColumn,
  OneToMany,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Reply } from './reply.entity';

@Entity('contact')
export class Contact {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  identifier: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 100 })
  email: string;

  @Column({ type: 'varchar', length: 15 })
  phone: string;

  @Column('text')
  message: string;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  deleted_at?: Date;

  @OneToMany(() => Reply, (reply) => reply.contact, {
    cascade: true,
  })
  replies: Reply[];
}
