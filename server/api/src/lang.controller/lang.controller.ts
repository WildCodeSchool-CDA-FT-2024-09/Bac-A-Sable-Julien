import express, { Response, Request } from "express";
import langs from "../../data/langs.json"
// import {validateRepo} from "../service/service"

const langController = express.Router();


interface Lang {
  id: number;
  label: string;
}


langController.get("/", (req:Request, res: Response) => {
  const { language } = req.query;
  console.log(req.query)
  const lang = language !== undefined ? langs.filter((lang: Lang) => lang.label === language) : langs;
  res.status(200).json(lang);
})

langController.get('/:id', (req: Request, res: Response) => {
  const lang = langs.find(lang => lang.id.toString() === req.params.id) as Lang;
  if (lang) {
    res.status(200).json(lang);
  } else {
    res.status(404).json({ message: 'Lang not found' });
  }
})

langController.post('/', (req: Request, res: Response) => {
  langs.push(req.body)
  res.status(201).json(req.body);
})

export default langController;