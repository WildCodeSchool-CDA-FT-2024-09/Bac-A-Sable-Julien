import express, { Response, Request } from "express";
import { validate } from "class-validator";
import { Status } from "../entities/status"
import { dataSource } from "../data-source";
// import repos from "../../data/repos.json"
// import { validateRepo } from "../service/service"

const statusController = express.Router();
// let myRepos: Array<Repo> = repos

// interface RepoInterface {
//   id: string;
//   name: string;
//   url: string;
//   isPrivate: number;
// }


statusController.get("/", async (_: any, res: Response) => {
  try {
    const status = await Status.find({
      relations: {
        repos: true
      }
    });
    res.status(200).json(status)
  } catch (error) {
    res.sendStatus(500)
  }
});

statusController.get('/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const status = await Status.findOneBy({ id });

  if (status) {
    res.status(200).json(status);
  } else {
    res.status(404).json({ message: 'status not found' });
  }
});

statusController.post('/', async (req: Request, _res: Response) => {
  const status = new Status();

  status.label = req.body.label;

  const errors = await validate(status)
  if (errors.length > 0) {
    throw new Error(`Validation failed!`)
  } else {
    await dataSource.manager.save(status)
  }
})

statusController.put('/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  const status = await Status.findOneBy({ id });
  if (status) {

    status.label = req.body.label;

    const errors = await validate(status)

    if (errors.length > 0) {
      console.log('%c⧭', 'color: #00e600', errors);
      throw new Error(`Validation failed!`)
    } else {
      await status.save()
      res.status(201).json({ message: 'Status modify' });
    }
  } else {
  }

})


statusController.delete('/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const status = await Status.findOneBy({ id });
  if (status) {
    await status.remove()
    res.status(204).json({ message: 'Status delete' });
  } else {
    res.status(404).json({ message: 'Status not found' });
  }
})

export default statusController;