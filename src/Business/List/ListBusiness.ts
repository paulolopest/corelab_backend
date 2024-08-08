import { Helper } from '../../Services/Helper'
import { ListData } from './../../Data/List/ListData'
import { CreateListBody } from '../../Models/Requests'
import { CustomError } from './../../Models/CustomError'
import { IdGenerator } from '../../Services/IdGenerator'
import { TokenManager } from '../../Services/TokenManager'
import { AuthenticationData } from '../../Models/AuthenticationData'

export class ListBusiness {
  constructor(
    private listData: ListData,
    private tokenManager: TokenManager,
    private helper: Helper,
    private idGenerator: IdGenerator,
  ) {}

  create = async (body: CreateListBody, token: string) => {
    try {
      this.helper.verifyFields(body)

      const user: AuthenticationData = this.tokenManager.getTokenData(token)

      const id: string = this.idGenerator.generate()

      return await this.listData.create(id, body.name, user.id)
    } catch (error: any) {
      if (error instanceof CustomError) {
        throw new CustomError(error.statusCode, error.message)
      } else {
        throw new Error(error.message)
      }
    }
  }
}
