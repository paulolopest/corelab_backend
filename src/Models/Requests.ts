export type SignUpBody = {
  username: string
  password: string
}

export type CreateUserBody = {
  id: string
  username: string
  password: string
  created_at: number
  updated_at: number
}

export type CreateListBody = {
  name: string
}
