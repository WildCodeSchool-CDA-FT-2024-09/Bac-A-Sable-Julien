import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { Status } from "./entities/status";
import { Language } from "../src/entities/language";
import { Repo } from "../src/entities/repo";

dotenv.config();
// const { BACKEND_FILE } = process.env;

// export const dataSource = new DataSource({
//   type: "sqlite",
//   database: `${BACKEND_FILE}`,
//   entities: [Repo, Status, Language],
//   synchronize: false,
// });

const { POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_USER, POSTGRES_HOST } =
  process.env;

export const dataSource = new DataSource({
  type: "postgres",
  host: POSTGRES_HOST,
  port: 5432,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  entities: [Repo, Language, Status],
  synchronize: true,
  logging: false
});
