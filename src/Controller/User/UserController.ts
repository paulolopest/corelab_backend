import { Request, Response } from 'express'
import { CustomError } from '../../Models/CustomError'
import { UserBusiness } from '../../Business/User/UserBusiness'
import { SignUpBody } from '../../Models/Requests'

export class UserController {
  constructor(private userBusiness: UserBusiness) {}

  create = async (req: Request, res: Response) => {
    try {
      const body: SignUpBody = req.body

      const result: string = await this.userBusiness.create(body)

      res.status(201).send({ message: 'Success', token: result })
    } catch (error: any) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(404).send(error.message)
      }
    }
  }
}
