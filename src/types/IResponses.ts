import { IUser } from "./IUser"
import { IPost } from "./IPost"
import { ILike } from "./ILike"

//TODO: Apagar as interfaces de resposta caso não use nenhuma
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
export interface ISuccessCreateLikeResponse {
  message: string
}

export interface ISuccessGetPostsResponse {
  posts: IPost[]
  next: string
}

export interface IResponseData {
  status: number
  data: any
}