import {
  BaseEntity,
  Column, Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
} from "typeorm";

import { Repo } from "./repo";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Language extends BaseEntity {

  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  label: string;

  @ManyToMany(() => Repo, repo => repo.languages)
  repos : Repo[];
}

