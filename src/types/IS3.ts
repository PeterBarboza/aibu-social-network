//import { Stream } from "aws-sdk/clients/glacier"
import { ManagedUpload } from "aws-sdk/clients/s3"
import { Stream } from "node:stream"

export interface IUploadToS3Params {
  Bucket: string
  Body: Stream
  Key: string
}

export interface IGetFromS3Params {
  Bucket: string
  Key: string
}

export interface IUploadImageToBucketResponse {
  hasFile: boolean,
  data?: {
    uploadData: ManagedUpload.SendData
  }
}