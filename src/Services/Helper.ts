import { User } from '@prisma/client'
import { CustomError } from '../Models/CustomError'
import { UserData } from '../Data/User/UserData'
import { TokenManager } from './TokenManager'

export class Helper {
  constructor(
    private userData: UserData,
    private tokenManager: TokenManager,
  ) {}

  verifyFields = (fields: any, check?: boolean, deniedArr?: Array<string>): void => {
    for (const key in fields) {
      if (fields[key] === undefined || fields[key] === null || fields[key] === '') {
        throw new CustomError(400, `Insert the ${key}`)
      }
    }

    const blockedFields: Array<string> = ['id', '_id', 'created_at', 'updated_at']

    const arr = Object.keys(fields)

    if (check === true) {
      for (let i = 0; i < arr.length; i++) {
        if (blockedFields.includes(arr[i])) {
          throw new CustomError(401, `Field '${arr[i]}' denied`)
        }
      }
      if (deniedArr) {
        for (let i = 0; i < arr.length; i++) {
          if (deniedArr.includes(arr[i])) {
            throw new CustomError(401, `Field '${arr[i]}' denied`)
          }
        }
      }
    }
  }

  date = {
    getDate: (): number => {
      return Date.now()
    },
  }

  validate = {
    user: {
      byUsername: async (username: string): Promise<User | null> => {
        const user: User | null = await this.userData.getUserByUsername(username)

        if (user) throw new CustomError(404, 'Username already in use')

        return user
      },

      byToken: async (token: string): Promise<User | null> => {
        if (!token) throw new CustomError(401, 'Log in first')

        const { id } = this.tokenManager.getTokenData(token)

        const user: User | null = await this.userData.getUserById(id)
        if (!user) throw new CustomError(404, 'User not found')

        return user
      },
    },
  }
}
