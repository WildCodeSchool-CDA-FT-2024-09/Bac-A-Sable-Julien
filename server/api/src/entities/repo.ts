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

// import {} from "class-validator"
import { Field, ObjectType, ID } from "type-graphql";

@ObjectType()
@Entity()
export class Repo extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  idGit: string;

  @Field()
  @Column()
  url: string;

  @Field(() => Status)
  @ManyToOne(() => Status, status => status.id)
  status: Status;
  
  @Field()
  @Column()
  name: string;

  @ManyToMany(() => Language, language => language.repos, { cascade: true })
  @JoinTable()
  languages?: Language[];

  @Field()
  @Column({ default: false }) 
  isFavorite: boolean; 

}

@ObjectType()
export class LightRepo extends BaseEntity {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  url: string;

  @Field()
  isFavorite: boolean;
}

