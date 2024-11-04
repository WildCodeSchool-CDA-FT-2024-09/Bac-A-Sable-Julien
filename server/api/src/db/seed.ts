import { In } from "typeorm";
import { dataSource } from "../data-source";
import { Language } from "../entities/language";
import { Status } from "../entities/status";
import { Repo } from "../entities/repo";
import langs from "../../data/langs.json";
import status from "../../data/status.json";
import raw from "../../data/raw.json";


interface LanguageData {
  label: string;
}

interface StatusData {
  label: string;
}

interface RepoData {
  id: string;
  name: string;
  url: string;
  isPrivate: boolean;
  languages: { node: { name: string } }[];
}



(async () => {
  await dataSource.initialize();
  const queryRunner = dataSource.createQueryRunner();
  try {
    await queryRunner.startTransaction();

    // Suppression des données existantes
    await queryRunner.query('TRUNCATE repo_languages_language CASCADE');
    await queryRunner.query('TRUNCATE language CASCADE');
    await queryRunner.query('TRUNCATE repo CASCADE');
    await queryRunner.query('TRUNCATE status CASCADE');

    console.log("troncate done")
    //demarre les ID => 0
    await queryRunner.query('ALTER SEQUENCE status_id_seq RESTART WITH 1');
    await queryRunner.query('ALTER SEQUENCE language_id_seq RESTART WITH 1');
    await queryRunner.query('ALTER SEQUENCE repo_id_seq RESTART WITH 1');

    // Insertion des statuts
    const savedStatuses = await Promise.all(
      status.map(async (el: StatusData) => {
        const status = new Status();
        status.label = el.label;
        console.log('%c⧭', 'color: #e5de73', status);
        return await queryRunner.manager.save(status);
      })
    );

    // Vérifie les statuts insérés
    console.log('Statuts insérés:', savedStatuses);

    // Insertion des langues
    await Promise.all(
      langs.map(async (el: LanguageData) => {
        const lang = new Language();
        lang.label = el.label;
        return await queryRunner.manager.save(lang);
      })
    );

    // Insertion des dépôts
    await Promise.all(
      raw.map(async (el: RepoData) => {
        const repos = new Repo();
        repos.idGit = el.id;
        repos.name = el.name;
        repos.url = el.url;

        const statusId = el.isPrivate ? 1 : 2;
        const status = await queryRunner.manager.findOne(Status, { where: { id: statusId } });
        if (!status) {
          throw new Error(`Status with id ${statusId} not found`);
        }
        repos.status = status;

        const langNames = el.languages.map(lang => lang.node.name);
        const languages = await queryRunner.manager.find(Language, { where: { label: In(langNames) } });
        repos.languages = languages;

        await queryRunner.manager.save(repos);
        return repos;
      })
    );

    // Validation de la transaction
    await queryRunner.commitTransaction();
    console.info("Seeder is DONE");
  } catch (error) {
    console.error(error);
    await queryRunner.rollbackTransaction();
  } finally {
    await queryRunner.release(); // Relâche le queryRunner
    await dataSource.destroy(); // Détruit la source de données
  }
})();
