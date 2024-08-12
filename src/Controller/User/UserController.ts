import { Request, Response } from 'express'
import { CustomError } from '../../Models/CustomError'
import { UserBusiness } from '../../Business/User/UserBusiness'
import { EditUserBody, AuthBody } from '../../Models/Requests'

export class UserController {
  constructor(private userBusiness: UserBusiness) {}

  create = async (req: Request, res: Response) => {
    try {
      const body: AuthBody = req.body

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

  login = async (req: Request, res: Response) => {
    try {
      const body: AuthBody = req.body

      const result: string | undefined = await this.userBusiness.login(body)

      res.status(201).send({ message: 'Success', token: result })
    } catch (error: any) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(404).send(error.message)
      }
    }
  }

  getProfile = async (req: Request, res: Response) => {
    try {
      const token: string = req.headers.authorization as string

      const result: object | null = await this.userBusiness.getProfile(token)

      res.status(200).send({ message: 'Success', response: result })
    } catch (error: any) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(404).send(error.message)
      }
    }
  }

  editProfile = async (req: Request, res: Response) => {
    try {
      const token: string = req.headers.authorization as string

      const body: EditUserBody = req.body

      const result = await this.userBusiness.editProfile(token, body)

      res.status(202).send({ message: 'Success', response: result })
    } catch (error: any) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(404).send(error.message)
      }
    }
  }

  deleteProfile = async (req: Request, res: Response) => {
    try {
      const token: string = req.headers.authorization as string

      await this.userBusiness.deleteProfile(token)

      res.status(202).send({ message: 'Success', response: 'User successfully deleted' })
    } catch (error: any) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(404).send(error.message)
      }
    }
  }
}
