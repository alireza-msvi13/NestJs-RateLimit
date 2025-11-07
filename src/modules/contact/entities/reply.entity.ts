import {
  Entity,
  Column,
  CreateDateColumn,
  ManyToOne,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Contact } from './contact.entity';

@Entity('contact_replies')
export class Reply {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  subject: string;

  @Column('text')
  message: string;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  deleted_at?: Date;

  @ManyToOne(() => Contact, (contact) => contact.replies)
  contact: Contact;
}
