import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { Status } from "./entities/status";
import { Language } from "../src/entities/language";
import { Repo } from "../src/entities/repo";

dotenv.config();
const { POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_USER, POSTGRES_HOST } =
  process.env;

export const dataSource = new DataSource({
  type: "postgres",
  host: POSTGRES_HOST,
  port: 5432,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  // username: "postgres",
  // password: "password",
  // database: "postgres",
  entities: [Repo, Language, Status],
  synchronize: true,
  logging: false
});
