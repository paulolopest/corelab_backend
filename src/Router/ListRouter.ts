import express, { Router } from 'express'
import { listController } from '../Config/DependencyInjection'

export const listRouter: Router = express.Router()

// Routes

listRouter.post('/list/create', listController.create)
