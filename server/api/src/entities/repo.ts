import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable
} from "typeorm";



import { Status } from "./status";
import { Language } from "./language";

import {
  Min,
  Max,
} from "class-validator"


@Entity()
export class Repo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  idGit: string;

  @Column()
  url: string;

  @ManyToOne(() => Status, status => status.id)
  @Min(1)
  @Max(2)
  status: Status;

  @Column()
  name: string;

  @ManyToMany(() => Language, language => language.repos,{cascade: true})
  @JoinTable()
  languages ? : Language[];

}

