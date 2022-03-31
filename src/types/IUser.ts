import { IPost } from "./IPost"

export interface IUser {
  name: string
  email: string
  password: string
  createdAt: Date
}

export interface IUserLogin {
  email: string
  password: string
}

export interface IErrorMessageResponse {
  message: string
}

export interface ISuccessUserResponse {
  user: IUser
  token: string
}

export interface ISuccessPostResponse {
  post: IPost
}

export interface IResponseData {
  status: number
  data: IErrorMessageResponse | ISuccessUserResponse | ISuccessPostResponse | any
}