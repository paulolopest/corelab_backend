import { prisma } from '../Database'

export class ListData {
  create = async (id: string, name: string, userId: string) => {
    try {
      return await prisma.list.create({
        data: {
          id,
          name,
          user_id: userId,
          created_at: Date.now(),
          updated_at: Date.now(),
        },
      })
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}
