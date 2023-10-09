import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "../../../Shared/Contexts/BaseEntity";

export interface ITournament {
  id_tournament: number;
  name: string;
  init_date: string;
  end_date: string;
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

  constructor(name: string, init_date: string, end_date: string) {
    super();
    this.name = name;
    this.init_date = init_date;
    this.end_date = end_date;
  }
}
