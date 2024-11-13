"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const data_source_1 = require("../data-source");
const language_1 = require("../entities/language");
const status_1 = require("../entities/status");
const repo_1 = require("../entities/repo");
const langs_json_1 = __importDefault(require("../../data/langs.json"));
const status_json_1 = __importDefault(require("../../data/status.json"));
const raw_json_1 = __importDefault(require("../../data/raw.json"));
(async () => {
    await data_source_1.dataSource.initialize();
    const queryRunner = data_source_1.dataSource.createQueryRunner();
    try {
        await queryRunner.startTransaction();
        await queryRunner.query('TRUNCATE repo_languages_language CASCADE');
        await queryRunner.query('TRUNCATE language CASCADE');
        await queryRunner.query('TRUNCATE repo CASCADE');
        await queryRunner.query('TRUNCATE status CASCADE');
        console.log("troncate done");
        await queryRunner.query('ALTER SEQUENCE status_id_seq RESTART WITH 1');
        await queryRunner.query('ALTER SEQUENCE language_id_seq RESTART WITH 1');
        await queryRunner.query('ALTER SEQUENCE repo_id_seq RESTART WITH 1');
        const savedStatuses = await Promise.all(status_json_1.default.map(async (el) => {
            const status = new status_1.Status();
            status.label = el.label;
            console.log('%c⧭', 'color: #e5de73', status);
            return await queryRunner.manager.save(status);
        }));
        console.log('Statuts insérés:', savedStatuses);
        await Promise.all(langs_json_1.default.map(async (el) => {
            const lang = new language_1.Language();
            lang.label = el.label;
            return await queryRunner.manager.save(lang);
        }));
        await Promise.all(raw_json_1.default.map(async (el) => {
            const repos = new repo_1.Repo();
            repos.idGit = el.id;
            repos.name = el.name;
            repos.url = el.url;
            const statusId = el.isPrivate ? 1 : 2;
            const status = await queryRunner.manager.findOne(status_1.Status, { where: { id: statusId } });
            if (!status) {
                throw new Error(`Status with id ${statusId} not found`);
            }
            repos.status = status;
            const langNames = el.languages.map(lang => lang.node.name);
            const languages = await queryRunner.manager.find(language_1.Language, { where: { label: (0, typeorm_1.In)(langNames) } });
            repos.languages = languages;
            await queryRunner.manager.save(repos);
            return repos;
        }));
        await queryRunner.commitTransaction();
        console.info("Seeder is DONE");
    }
    catch (error) {
        console.error(error);
        await queryRunner.rollbackTransaction();
    }
    finally {
        await queryRunner.release();
        await data_source_1.dataSource.destroy();
    }
})();
//# sourceMappingURL=seed.js.map