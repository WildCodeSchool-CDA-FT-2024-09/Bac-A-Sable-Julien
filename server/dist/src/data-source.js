"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSource = void 0;
const typeorm_1 = require("typeorm");
const dotenv = __importStar(require("dotenv"));
const status_1 = require("./entities/status");
const language_1 = require("../src/entities/language");
const repo_1 = require("../src/entities/repo");
dotenv.config();
const { POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_USER, POSTGRES_HOST } = process.env;
exports.dataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: POSTGRES_HOST,
    port: 5432,
    username: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DB,
    entities: [repo_1.Repo, language_1.Language, status_1.Status],
    synchronize: true,
    logging: false
});
//# sourceMappingURL=data-source.js.map