import { Request, Response } from 'express'
import { CreateListBody } from '../../Models/Requests'
import { CustomError } from '../../Models/CustomError'
import { ListBusiness } from './../../Business/List/ListBusiness'
import { User } from '@prisma/client'

export class ListController {
  constructor(private listBusiness: ListBusiness) {}

  create = async (req: Request, res: Response) => {
    try {
      const token: string = req.headers.authorization as string
      const body: CreateListBody = req.body

      const result = await this.listBusiness.create(body, token)

      res.status(201).send({ message: 'Success', response: result })
    } catch (error: any) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(404).send(error.message)
      }
    }
  }
}
