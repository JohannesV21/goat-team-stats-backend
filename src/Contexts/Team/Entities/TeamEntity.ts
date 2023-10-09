import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "../../../Shared/Contexts/BaseEntity";

export interface ITeam {
  id_team: number;
  name: string;
  rif: string;
}

export type ITeamToUpdate = Omit<ITeam, "id_team">;

@Entity({ name: "Teams" })
export class TeamEntity extends BaseEntity implements ITeam {
  @PrimaryGeneratedColumn()
  id_team!: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  rif: string;

  constructor(name: string, rif: string) {
    super();
    this.name = name;
    this.rif = rif;
  }
}
