import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "../../../Shared/Contexts/BaseEntity";

export interface IRoles {
  id_role: number;
  name: string;
}

export type IRoleToUpdate = Omit<IRoles, "id_role">;

@Entity({ name: "Roles" })
export class RoleEntity extends BaseEntity implements IRoles {
  @PrimaryGeneratedColumn()
  id_role!: number;

  @Column({ nullable: false })
  name: string;

  constructor(name: string) {
    super();
    this.name = name;
  }
}
