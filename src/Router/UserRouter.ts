import express, { Router } from 'express'
import { userController } from '../Config/DependencyInjection'

export const userRouter: Router = express.Router()

// Routes

userRouter.post('/user/create', userController.create)
