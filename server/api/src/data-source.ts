import { DataSource } from "typeorm";
import { Status } from "./entities/status";
import * as dotenv from "dotenv";
// import { School } from "../src/entities/school";
import { Language } from "../src/entities/language";
import { Repo } from "../src/entities/repo";

dotenv.config();
const { BACKEND_FILE } = process.env;

export const dataSource = new DataSource({
 type: "sqlite",
 database: `${BACKEND_FILE}`,
 entities: [Repo, Language, Status],
 synchronize: true,
//  logging: true
});
