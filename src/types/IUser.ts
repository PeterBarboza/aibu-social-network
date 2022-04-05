export interface IUser {
  name: string
  email: string
  password: string
  createdAt: number
}

export interface IUserLogin {
  email: string
  password: string
}