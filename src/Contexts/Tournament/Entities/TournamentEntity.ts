import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BaseEntity } from "../../../Shared/Contexts/BaseEntity";
import { TeamEntity } from "../../Team/Entities/TeamEntity";
import { MatchEntity } from "../../Match/Entities/MatchEntity";

export interface ITournament {
  id_tournament: number;
  name: string;
  init_date: string;
  end_date: string;
  // team: TeamEntity;
}

export type ITournamentToUpdate = Omit<ITournament, "id_tournament">;

@Entity({ name: "Tournaments" })
export class TournamentEntity extends BaseEntity implements ITournament {
  @PrimaryGeneratedColumn()
  id_tournament!: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  init_date: string;

  @Column({ nullable: false })
  end_date: string;

  @OneToMany(() => MatchEntity, (matches) => matches.tournament)
  matches!: MatchEntity[];

  @ManyToOne(() => TeamEntity, (team) => team.tournaments)
  @JoinColumn({ name: "id_team" })
  team!: TeamEntity;

  constructor(
    name: string,
    init_date: string,
    end_date: string
    // team: TeamEntity
  ) {
    super();
    this.name = name;
    this.init_date = init_date;
    this.end_date = end_date;
    // this.team = team;
  }
}
