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

export type CreateTaskBody = {
  name: string
  description: string
  favorite: boolean
  color?: string
  tags?: Array<string>
}

export type EditTaskBody = {
  name: string
  description: string
  favorite: boolean
  color?: string
  tags?: Array<string>
}

export type EditUserBody = {
  username: string
  password: string
  newPassword?: string
}
