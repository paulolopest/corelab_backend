import { User } from '@prisma/client'
import { Helper } from '../../Services/Helper'
import { UserData } from '../../Data/User/UserData'
import { CustomError } from '../../Models/CustomError'
import { IdGenerator } from '../../Services/IdGenerator'
import { HashManager } from '../../Services/HashManager'
import { TokenManager } from '../../Services/TokenManager'
import { EditUserBody, SignUpBody } from '../../Models/Requests'

export class UserBusiness {
  constructor(
    private userData: UserData,
    private helper: Helper,
    private idGenerator: IdGenerator,
    private tokenManager: TokenManager,
    private hashManager: HashManager,
  ) {}

  create = async (body: SignUpBody) => {
    try {
      this.helper.verifyFields(body)

      const verifyUsername: User | null = await this.helper.validate.user.byUsername(body.username)
      if (verifyUsername) throw new CustomError(409, 'Username already in use')

      if (body.password.length < 5) {
        throw new CustomError(400, 'Password must have a least 5 characters')
      }

      const id: string = this.idGenerator.generate()
      const token: string = this.tokenManager.generate({ id })
      const hashedPassword: string = await this.hashManager.generate(body.password)

      await this.userData.create(id, body.username, hashedPassword)

      return token
    } catch (error: any) {
      if (error instanceof CustomError) {
        throw new CustomError(error.statusCode, error.message)
      } else {
        throw new Error(error.message)
      }
    }
  }

  getProfile = async (token: string) => {
    try {
      const user: User | null = (await this.helper.validate.user.byToken(token)) as User

      return await this.userData.getProfile(user.id)
    } catch (error: any) {
      if (error instanceof CustomError) {
        throw new CustomError(error.statusCode, error.message)
      } else {
        throw new Error(error.message)
      }
    }
  }

  editProfile = async (token: string, body: EditUserBody) => {
    try {
      const user: User | null = (await this.helper.validate.user.byToken(token)) as User

      this.helper.verifyFields(body, true)

      if (body.username) await this.helper.validate.user.byUsername(body.username)
      if (body.newPassword) {
        if (!body.password) throw new CustomError(400, 'Confirm your current password')

        const checkPassword: boolean = await this.hashManager.compare(body.password, user.password)

        if (!checkPassword) throw new CustomError(409, 'Incorrect password')
        if (body.newPassword.length < 5) {
          throw new CustomError(401, 'Password must contain at least 5 characters')
        }

        const newPassword: string = await this.hashManager.generate(body.newPassword)

        return await this.userData.editProfile(user.id, body.username, newPassword)
      }

      return await this.userData.editProfile(user.id, body.username)
    } catch (error: any) {
      if (error instanceof CustomError) {
        throw new CustomError(error.statusCode, error.message)
      } else {
        throw new Error(error.message)
      }
    }
  }

  deleteProfile = async (token: string) => {
    try {
      const user: User | null = (await this.helper.validate.user.byToken(token)) as User

      if (user.id === 'c4d45e38-d4a7-4f63-83e1-0015833deb08') {
        throw new CustomError(409, 'Do not try to delete the test user')
      }
      await this.userData.deleteProfile(user.id)
    } catch (error: any) {
      if (error instanceof CustomError) {
        throw new CustomError(error.statusCode, error.message)
      } else {
        throw new Error(error.message)
      }
    }
  }
}
