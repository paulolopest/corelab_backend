import { Helper } from './../Services/Helper'
import { ListData } from '../Data/List/ListData'
import { UserData } from './../Data/User/UserData'
import { HashManager } from './../Services/HashManager'
import { IdGenerator } from './../Services/IdGenerator'
import { TokenManager } from './../Services/TokenManager'
import { ListBusiness } from '../Business/List/ListBusiness'
import { UserBusiness } from './../Business/User/UserBusiness'
import { ListController } from '../Controller/List/ListController'
import { UserController } from './../Controller/User/UserController'

//

export const userData: UserData = new UserData()
export const listData: ListData = new ListData()

export const tokenManager: TokenManager = new TokenManager()
export const helper: Helper = new Helper(userData, tokenManager)
export const idGenerator: IdGenerator = new IdGenerator()
export const hashManager: HashManager = new HashManager()

//

export const userBusiness: UserBusiness = new UserBusiness(
  userData,
  helper,
  idGenerator,
  tokenManager,
  hashManager,
)
export const userController: UserController = new UserController(userBusiness)

//

export const listBusiness: ListBusiness = new ListBusiness(
  listData,
  tokenManager,
  helper,
  idGenerator,
)
export const listController: ListController = new ListController(listBusiness)
