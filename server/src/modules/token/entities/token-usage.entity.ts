import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'token_usages'
})
export class TokenUsage extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type: 'text'})
  usedBy: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}