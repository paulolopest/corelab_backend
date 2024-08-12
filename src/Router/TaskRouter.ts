import express, { Router } from 'express'
import { taskController } from '../Config/DependencyInjection'

export const taskRouter: Router = express.Router()

// Routes

taskRouter.post('/task/create', taskController.create)

taskRouter.get('/task/get-all', taskController.getTasks)
taskRouter.get('/task/:id', taskController.getTaskById)
taskRouter.get('/task/search/:word', taskController.searchTask)

taskRouter.put('/task/edit/:id', taskController.editTask)

taskRouter.delete('/task/delete/:id', taskController.deleteTask)
