import { TaskBusiness } from '../../Business/Task/TaskBusiness'
import { CustomError } from '../../Models/CustomError'
import { CreateTaskBody, EditTaskBody } from '../../Models/Requests'
import { Request, Response } from 'express'
import { Task } from '@prisma/client'

export class TaskController {
  constructor(private taskBusiness: TaskBusiness) {}

  create = async (req: Request, res: Response) => {
    try {
      const token: string = req.headers.authorization as string
      const body: CreateTaskBody = req.body

      const result: Task | null = await this.taskBusiness.create(token, body)

      res.status(201).send({ message: 'Success', response: result })
    } catch (error: any) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(404).send(error.message)
      }
    }
  }

  getTasks = async (req: Request, res: Response) => {
    try {
      const token: string = req.headers.authorization as string
      const { limit, order, by } = req.query

      const result: Task[] = await this.taskBusiness.getTasks(
        token,
        limit as string,
        order as string,
        by as string,
      )

      res.status(200).send({ message: 'Success', response: result })
    } catch (error: any) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(404).send(error.message)
      }
    }
  }

  searchTask = async (req: Request, res: Response) => {
    try {
      const token: string = req.headers.authorization as string
      const { word } = req.params

      const result = await this.taskBusiness.searchTask(token, word as string)

      res.status(200).send({ message: 'Success', response: result })
    } catch (error: any) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(404).send(error.message)
      }
    }
  }

  editTask = async (req: Request, res: Response) => {
    try {
      const token: string = req.headers.authorization as string
      const { id } = req.params
      const body: EditTaskBody = req.body

      const result: Task | null = await this.taskBusiness.editTask(token, id, body)

      res.status(201).send({ message: 'Success', response: result })
    } catch (error: any) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(404).send(error.message)
      }
    }
  }

  deleteTask = async (req: Request, res: Response) => {
    try {
      const token: string = req.headers.authorization as string
      const { id } = req.params

      await this.taskBusiness.deleteTask(token, id)

      res.status(202).send({ message: 'Success', response: 'Task successfully deleted' })
    } catch (error: any) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(404).send(error.message)
      }
    }
  }
}
