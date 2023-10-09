import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BaseEntity } from "../../../Shared/Contexts/BaseEntity";
import { TeamEntity } from "../../Team/Entities/TeamEntity";

export interface IAdmin {
  id_admin: number;
  email: string;
  password: string;
  team: TeamEntity;
}

export type IAdminToUpdate = Omit<IAdmin, "id_admin">;

@Entity({ name: "Admin" })
export class AdminEntity extends BaseEntity implements IAdmin {
  @PrimaryGeneratedColumn()
  id_admin!: number;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @OneToOne(() => TeamEntity, (team) => team.admin)
  @JoinColumn({ name: "id_team" })
  team!: TeamEntity;

  constructor(email: string, password: string) {
    super();
    this.email = email;
    this.password = password;
  }
}
