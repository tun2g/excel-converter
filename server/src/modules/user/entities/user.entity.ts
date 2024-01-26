import { AuditableEntity } from "src/lib/common/entities/auditable.entity";
import { AuthProviderType } from "src/security/constants";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'users'
})
export class User extends AuditableEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', unique: true })
  email: string;

  @Column({ type: 'text', nullable: true })
  hashedPassword: string;

  @Column({ type: 'text', nullable: true })
  username: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'enum', enum: AuthProviderType })
  authProvider: AuthProviderType;

  @Column({
    nullable: true,
  })
  hashedRefreshToken?: string;
}