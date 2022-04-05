import { IUser } from "./IUser"
import { IPost } from "./IPost"

export interface IErrorMessageResponse {
  message: any
}

export interface ISuccessUserResponse {
  user: IUser
  token: string
}

export interface ISuccessCreatePostResponse {
  post: IPost
}

export interface ISuccessGetPostsResponse {
  posts: IPost[]
  next: string
}

export interface IResponseData {
  status: number
  data: any
}