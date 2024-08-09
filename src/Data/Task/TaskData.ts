import { Task } from '@prisma/client'
import { CreateTaskBody, EditTaskBody } from '../../Models/Requests'
import { prisma } from './../Database'

export class TaskData {
  create = async (id: string, userId: string, body: CreateTaskBody) => {
    try {
      return await prisma.task.create({
        data: {
          id,
          name: body.name,
          user_id: userId,
          description: body.description,
          favorite: body.favorite,
          color: body.color || '#f5f8fc',
          tags: body.tags,
          created_at: Date.now().toString(),
          updated_at: Date.now().toString(),
        },
      })
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  getTasks = async (
    userId: string,
    by: keyof typeof prisma.task.fields,
    limit?: string,
    order: 'asc' | 'desc' = 'asc',
  ) => {
    try {
      return await prisma.task.findMany({
        where: { user_id: userId },
        take: limit ? Number(limit) : 20,
        orderBy: {
          [by]: order,
        },
      })
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  getTaskById = async (id: string) => {
    try {
      return await prisma.task.findUnique({
        where: { id },
      })
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  searchTask = async (userId: string, word: string) => {
    try {
      const result: Task[] = await prisma.task.findMany({
        where: {
          user_id: userId,
          OR: [
            { name: { search: word } },
            { description: { search: word } },
            { tags: { has: word } },
          ],
        },
      })

      return result
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  editTask = async (taskId: string, userId: string, body: EditTaskBody) => {
    try {
      return await prisma.task.update({
        where: { id: taskId, user_id: userId },
        data: {
          ...body,
        },
      })
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  deleteTask = async (userId: string, taskId: string) => {
    try {
      await prisma.task.delete({
        where: {
          id: taskId,
          user_id: userId,
        },
      })
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}
