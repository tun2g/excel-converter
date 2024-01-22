import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class AuditableEntity extends BaseEntity {
  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @Column({ nullable: true })
  created_by: string;

  @Column({ nullable: true })
  updated_by: string;

  @DeleteDateColumn()
  deleted_at: Date;
}
