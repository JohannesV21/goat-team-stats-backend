import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "../../../Shared/Contexts/BaseEntity";
import { TeamEntity } from "../../Team/Entities/TeamEntity";

export interface IAdmin {
  id_admin: number;
  email: string;
  password: string;
}

export type IAdminToUpdate = Omit<IAdmin, "id_admin">;

@Entity({ name: "Admin" })
export class AdminEntity extends BaseEntity implements IAdmin {
  @PrimaryGeneratedColumn()
  id_admin!: number;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @OneToMany(() => TeamEntity, (teams) => teams.admin)
  teams!: TeamEntity;

  constructor(email: string, password: string) {
    super();
    this.email = email;
    this.password = password;
  }
}
