import { AuditableEntity } from "src/lib/common/entities/auditable.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'user_roles'
})
export class UserRole extends AuditableEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid'})
  roleId: string;

  @Column({ type: 'uuid' })
  userId: string;
}