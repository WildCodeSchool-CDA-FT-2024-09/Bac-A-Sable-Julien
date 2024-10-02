import { In } from "typeorm";
import { dataSource } from "../data-source";
import { Language } from "../entities/language";
import { Status } from "../entities/status";
import { Repo } from "../entities/repo";
import langs from "../../data/langs.json";
import status from "../../data/status.json"
import raw from "../../data/raw.json"

(
  async () => {
    await dataSource.initialize();
    const queryRunner = dataSource.createQueryRunner();
    try {
      await queryRunner.startTransaction()
      await queryRunner.query('DELETE FROM repo_languages_language');
      await queryRunner.query('DELETE FROM language');
      await queryRunner.query('DELETE FROM repo');
      await queryRunner.query('DELETE FROM status');

      await queryRunner.query('DELETE FROM sqlite_sequence WHERE name IN ("language", "repo", "status")');
      // await queryRunner.query('DELETE FROM sqlite_sequence WHERE name="language" OR name="repo"');




      const saveStatus = await Promise.all(
        status.map(async (el) => {
          const status = new Status();
          status.label = el.label

          return await status.save()
        })
      );
      console.log('%c⧭', 'color: #e50000', 'status', saveStatus);

      const saveLang = await Promise.all(
        langs.map(async (el) => {
          const lang = new Language();
          lang.label = el.label

          return await lang.save()
        })
      );
      console.log('%c⧭', 'color: #e50000', 'langue', saveLang);



      const saveRepo = await Promise.all(
        raw.map(async (el) => {
          const repos = new Repo();
          repos.idGit = el.id
          repos.name = el.name
          repos.url = el.url

          const statusId = el.isPrivate ? 1 : 2;
          const status = await Status.findOne({ where: { id: statusId } });
          if (!status) {
            throw new Error(`Status with id ${statusId} not found`);
          }
          repos.status = status;

          // Récupère les noms des langues
          const langNames = el.languages.map(lang => lang.node.name);
          const languages = await Language.find({ where: { label: In(langNames) } });
          console.log('%c⧭', 'color: #917399', 'Langues trouvées:', languages);

          // Associe les langues trouvées au dépôt
          repos.languages = languages;

          // Sauvegarde le dépôt et retourne l'instance
          console.log('%c⧭', 'color: #ffa640','return repo ', repos);
          await repos.save();
        })
      );
      console.log('%c⧭', 'color: #d90000', saveRepo[0]);

      await queryRunner.commitTransaction();

    } catch (error) {
      console.error(error);
    }
  }
)()