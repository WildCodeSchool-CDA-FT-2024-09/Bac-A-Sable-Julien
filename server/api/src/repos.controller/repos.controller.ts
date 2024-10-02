import express, { Response, Request } from "express";
import { Repo } from "../entities/repo"
import { Status } from "../entities/status";
import { Language } from "../entities/language";
import { In } from "typeorm";

const repoControllers = express.Router();


repoControllers.get("/", async (_req: Request, res: Response) => {
  try {
    const repos = await Repo.find({
      relations: {
        status: true,
        languages: true
      }
    },
    )
    res.status(200).json(repos)
  }
  catch (error) {
    res.sendStatus(500).json({ message: "Error fetching repos" })
  }
});

repoControllers.get('/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const repo = await Repo.findOneBy({ id });

  if (repo) {
    res.status(200).json(repo);
  } else {
    res.status(404).json({ message: 'Repo not found' });
  }
});


repoControllers.post('/', async (req: Request, res: Response) => {
  console.log('%c⧭', 'color: #00a3cc', " hello");

  try {
    const repo = new Repo();

    repo.idGit = req.body.idGit;  
    repo.name = req.body.name;
    repo.url = req.body.url;

    const status = await Status.findOneOrFail({ where: { id: req.body.isPrivate } });
    repo.status = status;
    
      const languageEntities = await Language.findBy({id: In(req.body.languages)});
      repo.languages = languageEntities;

    await repo.save();
    res.status(201).json({ message: "Repo created successfully", repo });
  }
  catch (error) {
    console.error(error); 
    res.status(500).json({ message: "Error creating repo" });
  }
});



repoControllers.put('/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  const repo = await Repo.findOneBy({ id });
  if (repo) {
    repo.idGit = req.body.idGit;
    repo.name = req.body.name;
    repo.url = req.body.url;

    const status = await Status.findOneOrFail({ where: { id: req.body.status } })
    repo.status = status;


    await repo.save()
    res.status(201).json({ message: 'Repo modify' });

  } else {
    throw new Error(`erreur de modification`)
  }

})


repoControllers.delete('/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const repo = await Repo.findOneBy({ id });
  if (repo) {
    await repo.remove()
    res.status(204).json({ message: 'Repo delete' });
  } else {
    res.status(404).json({ message: 'Repo not found' });
  }
})

export default repoControllers;