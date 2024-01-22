import { AuditableEntity } from "src/lib/common/entities/auditable.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'users'
})
export class User extends AuditableEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', unique: true })
  email: string;

  @Column({ type: 'text', nullable: false })
  hashed_password: string;

  @Column({ type: 'text', nullable: false })
  username: string;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @Column({
    nullable: true,
  })
  hashed_refresh_token?: string;
}