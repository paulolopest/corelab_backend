import { prisma } from './../Database'

export class UserData {
  create = async (id: string, username: string, password: string) => {
    try {
      await prisma.user.create({
        data: {
          id,
          username,
          password,
          created_at: Date.now().toString(),
          updated_at: Date.now().toString(),
        },
      })
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  getProfile = async (id: string) => {
    try {
      return await prisma.user.findUnique({
        where: { id },
        select: {
          id: true,
          username: true,
          created_at: true,
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

  editProfile = async (id: string, username?: string, password?: string) => {
    try {
      const data: any = { updated_at: Date.now().toString() }

      if (username !== undefined) data.username = username
      if (password !== undefined) data.password = password

      return await prisma.user.update({
        where: { id },
        data,
        select: {
          id: true,
          username: true,
          created_at: true,
          updated_at: true,
        },
      })
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  deleteProfile = async (id: string) => {
    try {
      await prisma.user.delete({
        where: { id },
      })
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}
