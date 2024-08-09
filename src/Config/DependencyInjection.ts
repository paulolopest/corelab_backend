import { Helper } from './../Services/Helper'
import { TaskData } from '../Data/Task/TaskData'
import { UserData } from './../Data/User/UserData'
import { HashManager } from './../Services/HashManager'
import { IdGenerator } from './../Services/IdGenerator'
import { TokenManager } from './../Services/TokenManager'
import { TaskBusiness } from '../Business/Task/TaskBusiness'
import { UserBusiness } from './../Business/User/UserBusiness'
import { TaskController } from '../Controller/Task/TaskController'
import { UserController } from './../Controller/User/UserController'

//

export const userData: UserData = new UserData()
export const taskData: TaskData = new TaskData()

export const tokenManager: TokenManager = new TokenManager()
export const helper: Helper = new Helper(userData, taskData, tokenManager)
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

export const taskBusiness: TaskBusiness = new TaskBusiness(taskData, helper, idGenerator)

export const taskController: TaskController = new TaskController(taskBusiness)
