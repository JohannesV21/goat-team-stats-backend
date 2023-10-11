import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BaseEntity } from "../../../Shared/Contexts/BaseEntity";
import { UserEntity } from "../../Users/Entities/UserEntity";
import { AdminEntity } from "../../Admin/Entities/AdminEntity";
import { MatchEntity } from "../../Match/Entities/MatchEntity";
import { TournamentEntity } from "../../Tournament/Entities/TournamentEntity";

export interface ITeam {
  id_team: number;
  name: string;
  rif: string;
  admin: AdminEntity;
}

// export type ITeamToUpdate = Omit<ITeam, "id_team">;

export interface ITeamToUpdate {
  name: string;
  rif: string;
  users?: UserEntity;
  matches?: MatchEntity;
  tournaments?: TournamentEntity;
}

@Entity({ name: "Teams" })
export class TeamEntity extends BaseEntity implements ITeam {
  @PrimaryGeneratedColumn()
  id_team!: number;

  @Column({ nullable: false, unique: true })
  name: string;

  @Column({ nullable: false, unique: true })
  rif: string;

  @ManyToOne(() => AdminEntity, (admin) => admin.teams)
  @JoinColumn({ name: "id_admin" })
  admin: AdminEntity;

  @OneToMany(() => UserEntity, (users) => users.team)
  users!: UserEntity[];

  @OneToMany(() => MatchEntity, (matches) => matches.team)
  matches!: MatchEntity[];

  @OneToMany(() => TournamentEntity, (torunaments) => torunaments.team)
  tournaments!: TournamentEntity[];

  constructor(name: string, rif: string, admin: AdminEntity) {
    super();
    this.name = name;
    this.rif = rif;
    this.admin = admin;
  }
}
