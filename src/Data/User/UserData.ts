import { prisma } from './../Database'

export class UserData {
  create = async (id: string, username: string, password: string) => {
    try {
      await prisma.user.create({
        data: {
          id,
          username,
          password,
          created_at: Date.now(),
          updated_at: Date.now(),
        },
      })
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  getUserByUsername = async (username: string) => {
    try {
      return await prisma.user.findUnique({
        where: { username },
      })
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  getUserById = async (id: string) => {
    try {
      return await prisma.user.findUnique({
        where: { id },
      })
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}
