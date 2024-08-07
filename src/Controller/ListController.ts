import { Request, Response } from 'express'
import { ListBusiness } from '../Business/ListBusiness'

export class ListController {
  constructor(private listBusiness: ListBusiness) {}
}
