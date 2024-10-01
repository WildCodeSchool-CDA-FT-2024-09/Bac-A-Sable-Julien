import express, { Response, Request } from "express";
import { Language } from "../entities/language";
import { Repo } from "../entities/repo"
// import langs from "../../data/langs.json"
// import {validateRepo} from "../service/service"

const langController = express.Router();


// interface Lang {
//   id: number;
//   label: string;
// }

langController.get("/", async (_: any, res: Response) => {
  try {
    const lang = await Language.find({
      relations: {
        repos: true
      }
    });
    res.status(200).json(lang)
  } catch (error) {
    res.sendStatus(500)
  }
});

langController.get('/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const lang = await Language.findOneBy({ id });

  if (lang) {
    res.status(200).json(lang);
  } else {
    res.status(404).json({ message: 'lang not found' });
  }
});

langController.post('/', async (req: Request, _res: Response) => {
  const lang = new Language();

  lang.label = req.body.label;

  lang.save()

})

langController.put('/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  const lang = await Language.findOneBy({ id });
  if (lang) {

    lang.label = req.body.label;

    const repo = await Repo.findOneOrFail({ where: { id: req.body.repo } })
    lang.repos = [...(lang.repos || []), repo];

    await lang.save()
    res.status(201).json({ message: 'lang modify' });

  } else {
    throw new Error(`erreur de modification`)
  }
})


langController.delete('/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const lang = await Language.findOneBy({ id });
  if (lang) {
    await lang.remove()
    res.status(204).json({ message: 'lang delete' });
  } else {
    res.status(404).json({ message: 'lang not found' });
  }
})

export default langController;