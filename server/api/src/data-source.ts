import { DataSource } from "typeorm";
import { Status } from "./entities/status";
import { Language } from "../src/entities/language";
import { Repo } from "../src/entities/repo";

export const dataSource = new DataSource({
  type: "postgres",
  host: "db",
  port: 5432,
  username: "postgres",
  password: "password",
  database: "postgres",
  entities: [Repo, Language, Status],
  synchronize: true,
  logging: false
});
