import express, { Response, Request } from "express";
import repos from "../../data/repos.json"
import { validateRepo } from "../service/service"

const repoControllers = express.Router();
let myRepos: Array<Repo> = repos

interface Repo {
  id: string;
  name: string;
  url: string;
  isPrivate: number;
}


repoControllers.get("/", (req: Request, res: Response) => {
  const {status} = req.query;
  console.log(status)
  const result = status !== undefined ? myRepos.filter((repo: Repo) => repo.isPrivate === +status) : myRepos;
  res.status(200).json(result)

})

repoControllers.get('/:id', (req: Request, res: Response) => {
  const repo = repos.find(rep => rep.id === req.params.id) as Repo;
  if (repo) {
    res.status(200).json(repo);
  } else {
    res.status(404).json({ message: 'Repo not found' });
  }
})

repoControllers.post('/', validateRepo, (req: Request, res: Response) => {
  repos.push(req.body)
  res.status(201).json(req.body);
})


repoControllers.delete('/:id', (req: Request, res: Response) => {
  myRepos = myRepos.filter((repo: Repo) => repo.id !== req.params.id)
    res.status(204);
})

export default repoControllers;