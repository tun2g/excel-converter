import { RoleType } from "src/lib/constants";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'roles'
})
export class Role extends BaseEntity{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: RoleType, unique: true })
  name: RoleType;
}