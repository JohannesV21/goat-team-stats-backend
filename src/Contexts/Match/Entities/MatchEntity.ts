import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BaseEntity } from "../../../Shared/Contexts/BaseEntity";
import { TeamEntity } from "../../Team/Entities/TeamEntity";
import { TournamentEntity } from "../../Tournament/Entities/TournamentEntity";

export interface IMatch {
  id_match: number;
  date: string;
  team_goals: number;
  opponent_goals: number;
  yellow_cards: number;
  red_cards: number;
  shots_taken: number;
  shots_on_goal: number;
  completed_passes: number;
  fouls_comitted: number;
  team: TeamEntity;
  tournament?: TournamentEntity;
}

export type IMatchToUpdate = Omit<IMatch, "id_match">;

@Entity({ name: "Matches" })
export class MatchEntity extends BaseEntity implements IMatch {
  @PrimaryGeneratedColumn()
  id_match!: number;

  @Column({ nullable: false })
  date: string;

  @Column({ nullable: false })
  team_goals: number;

  @Column({ nullable: false })
  opponent_goals: number;

  @Column({ nullable: false })
  yellow_cards: number;

  @Column({ nullable: false })
  red_cards: number;

  @Column({ nullable: false })
  shots_taken: number;

  @Column({ nullable: false })
  shots_on_goal: number;

  @Column({ nullable: false })
  completed_passes: number;

  @Column({ nullable: false })
  fouls_comitted: number;

  @ManyToOne(() => TeamEntity, (team) => team.matches)
  @JoinColumn({ name: "id_team" })
  team: TeamEntity;

  @ManyToOne(() => TournamentEntity, (tournament) => tournament.matches)
  @JoinColumn({ name: "id_tournament" })
  tournament?: TournamentEntity;

  constructor(
    date: string,
    team_goals: number,
    opponent_goals: number,
    yellow_cards: number,
    red_cards: number,
    shots_taken: number,
    shots_on_goal: number,
    completed_passes: number,
    fouls_comitted: number,
    team: TeamEntity,
    tournament?: TournamentEntity
  ) {
    super();
    this.date = date;
    this.team_goals = team_goals;
    this.opponent_goals = opponent_goals;
    this.yellow_cards = yellow_cards;
    this.red_cards = red_cards;
    this.shots_taken = shots_taken;
    this.shots_on_goal = shots_on_goal;
    this.completed_passes = completed_passes;
    this.fouls_comitted = fouls_comitted;
    this.team = team;
    this.tournament = tournament;
  }
}
