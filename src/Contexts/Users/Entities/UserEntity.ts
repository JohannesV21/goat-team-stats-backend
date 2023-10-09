import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "../../../Shared/Contexts/BaseEntity";

export interface IUser {
  id_user: number;
  first_name: string;
  last_name: string;
  birthdate: string;
  cedula: string;
  phone: string;
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

  @Column({ nullable: false })
  cedula: string;

  @Column({ nullable: false })
  phone: string;

  constructor(
    first_name: string,
    last_name: string,
    birthdate: string,
    cedula: string,
    phone: string
  ) {
    super();
    this.first_name = first_name;
    this.last_name = last_name;
    this.birthdate = birthdate;
    this.cedula = cedula;
    this.phone = phone;
  }
}
