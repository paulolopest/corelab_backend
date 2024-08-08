import { User } from '@prisma/client'
import { Helper } from '../../Services/Helper'
import { SignUpBody } from '../../Models/Requests'
import { UserData } from '../../Data/User/UserData'
import { CustomError } from '../../Models/CustomError'
import { IdGenerator } from '../../Services/IdGenerator'
import { HashManager } from '../../Services/HashManager'
import { TokenManager } from '../../Services/TokenManager'

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
}
