import { Response, Request, NextFunction } from "express";
import Joi from 'joi';


const shema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  url: Joi.string().required(),
  isPrivate: Joi.number().min(1).max(2).required()
})

const validateRepo = (req: Request, res: Response, next: NextFunction) => {
  console.log("type de isPrivate ",typeof req.body.isPrivate)
  const { error } = shema.validate(req.body)

  if (error == null) {
    next()
  } else {
    res.status(422).json(error)
  }

}

export {validateRepo};