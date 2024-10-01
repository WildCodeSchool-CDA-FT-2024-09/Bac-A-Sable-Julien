import { DataSource } from "typeorm";
import { Status } from "./entities/status";
// import { School } from "../src/entities/school";
import { Language } from "../src/entities/language";
import { Repo } from "../src/entities/repo";

export const dataSource = new DataSource({
 type: "sqlite",
 database: "./api/src/db/db.sqlite",
 entities: [Repo, Language, Status],
 synchronize: true,
});
