export interface IUser {
  name: string
  email: string
  password: string
  username: string
  bio: string
  createdAt: number
}

export interface IUpdatePasswordReqBody {
  newPassword: string
}

export interface IUpdateUserReqBody {
  name: string
  username: string
  bio: string
}

export interface IUserLogin {
  email: string
  password: string
}