import {
  BaseEntity,
  Column, Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
} from "typeorm";

import { Repo } from "./repo";
import { Field, InputType, ObjectType } from "type-graphql";

@InputType()
export class LanguageInput {

  @Field()
  @Column()
  label: string;
}

@ObjectType()
@InputType()
@Entity()
export class Language extends BaseEntity {

  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  label: string;

  @Field(() => [Repo], { nullable: true })
  @ManyToMany(() => Repo, repo => repo.languages)
  repos: Repo[];
}

