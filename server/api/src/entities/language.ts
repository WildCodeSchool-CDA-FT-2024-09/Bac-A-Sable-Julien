import {
  BaseEntity,
  Column, Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
} from "typeorm";

import { Repo } from "./repo";

@Entity()
export class Language extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  label: string;

  @ManyToMany(() => Repo, repo => repo.languages)
  repos : Repo[];
}

