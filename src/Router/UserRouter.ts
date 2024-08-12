import express, { Router } from 'express'
import { userController } from '../Config/DependencyInjection'

export const userRouter: Router = express.Router()

// Routes

userRouter.post('/user/create', userController.create)
userRouter.post('/user/login', userController.login)

userRouter.get('/user/profile', userController.getProfile)

userRouter.put('/user/edit', userController.editProfile)

userRouter.delete('/user/delete', userController.deleteProfile)
