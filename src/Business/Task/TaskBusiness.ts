import { Task, User } from '@prisma/client'
import { Helper } from '../../Services/Helper'
import { TaskData } from './../../Data/Task/TaskData'
import { CustomError } from '../../Models/CustomError'
import { CreateTaskBody, EditTaskBody } from '../../Models/Requests'
import { IdGenerator } from '../../Services/IdGenerator'

export class TaskBusiness {
  constructor(
    private taskData: TaskData,
    private helper: Helper,
    private idGenerator: IdGenerator,
  ) {}

  create = async (token: string, body: CreateTaskBody) => {
    try {
      const user: User | null = (await this.helper.validate.user.byToken(token)) as User
      this.helper.verifyFields(body)

      const id: string = this.idGenerator.generate()

      return await this.taskData.create(id, user.id, body)
    } catch (error: any) {
      if (error instanceof CustomError) {
        throw new CustomError(error.statusCode, error.message)
      } else {
        throw new Error(error.message)
      }
    }
  }

  getTasks = async (token: string, limit?: string, order?: string, by?: string) => {
    try {
      const user: User | null = (await this.helper.validate.user.byToken(token)) as User

      return await this.taskData.getTasks(user.id, by as any, limit, order as any)
    } catch (error: any) {
      if (error instanceof CustomError) {
        throw new CustomError(error.statusCode, error.message)
      } else {
        throw new Error(error.message)
      }
    }
  }

  searchTask = async (token: string, word: string) => {
    try {
      const user: User | null = (await this.helper.validate.user.byToken(token)) as User
      if (!word || word === ':word') throw new CustomError(400, 'Enter a word')

      return await this.taskData.searchTask(user.id, word)
    } catch (error: any) {
      if (error instanceof CustomError) {
        throw new CustomError(error.statusCode, error.message)
      } else {
        throw new Error(error.message)
      }
    }
  }

  editTask = async (token: string, taskId: string, body: EditTaskBody) => {
    try {
      const user: User | null = (await this.helper.validate.user.byToken(token)) as User
      const task: Task | null = (await this.helper.validate.task.byId(
        taskId,
        true,
        user.id,
      )) as Task

      return await this.taskData.editTask(task.id, user.id, body)
    } catch (error: any) {
      if (error instanceof CustomError) {
        throw new CustomError(error.statusCode, error.message)
      } else {
        throw new Error(error.message)
      }
    }
  }

  deleteTask = async (token: string, taskId: string) => {
    try {
      const user: User | null = (await this.helper.validate.user.byToken(token)) as User
      const task: Task | null = (await this.helper.validate.task.byId(
        taskId,
        true,
        user.id,
      )) as Task

      await this.taskData.deleteTask(user.id, task.id)
    } catch (error: any) {
      if (error instanceof CustomError) {
        throw new CustomError(error.statusCode, error.message)
      } else {
        throw new Error(error.message)
      }
    }
  }
}
