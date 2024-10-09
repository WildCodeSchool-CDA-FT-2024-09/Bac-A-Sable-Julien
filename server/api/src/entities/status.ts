import {
  BaseEntity,
  Column, Entity,
  PrimaryGeneratedColumn, OneToMany
} from "typeorm";

import { ObjectType, Field } from "type-graphql";

import { Repo } from "./repo";


@ObjectType()
@Entity()
export class Status extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Field()
  label: string;

  @OneToMany(() => Repo, repo => repo.status)
  repos?: Repo[]
}
