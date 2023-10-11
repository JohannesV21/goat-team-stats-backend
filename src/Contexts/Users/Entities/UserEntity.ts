import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BaseEntity } from "../../../Shared/Contexts/BaseEntity";
import { RoleEntity } from "../../Role/Entities/RoleEntity";
import { TeamEntity } from "../../Team/Entities/TeamEntity";

export interface IUser {
  id_user: number;
  first_name: string;
  last_name: string;
  birthdate: string;
  cedula: string;
  phone: string;
  role: RoleEntity;
  team: TeamEntity;
}

export type IUserToUpdate = Omit<IUser, "id_user">;

@Entity({ name: "Users" })
export class UserEntity extends BaseEntity implements IUser {
  @PrimaryGeneratedColumn()
  id_user!: number;

  @Column({ nullable: false })
  first_name: string;

  @Column({ nullable: false })
  last_name: string;

  @Column({ nullable: false })
  birthdate: string;

  @Column({ nullable: false, unique: true })
  cedula: string;

  @Column({ nullable: false })
  phone: string;

  @ManyToOne(() => RoleEntity, (role) => role.users)
  @JoinColumn({ name: "id_role" })
  role: RoleEntity;

  @ManyToOne(() => TeamEntity, (team) => team.users, { onDelete: "CASCADE" })
  @JoinColumn({ name: "id_team" })
  team: TeamEntity;

  constructor(
    first_name: string,
    last_name: string,
    birthdate: string,
    cedula: string,
    phone: string,
    role: RoleEntity,
    team: TeamEntity
  ) {
    super();
    this.first_name = first_name;
    this.last_name = last_name;
    this.birthdate = birthdate;
    this.cedula = cedula;
    this.phone = phone;
    this.role = role;
    this.team = team;
  }
}
