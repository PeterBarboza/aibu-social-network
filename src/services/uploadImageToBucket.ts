import { Request } from "express"
import { createReadStream } from "fs"

import { s3, bucketName } from "../s3"

import { IUploadToS3Params } from "../types/IS3"

export async function uploadImageToBucket(req: Request) {
  if (!req.file) {
    return {
      hasFile: false
    }
  }

  try {
    const imageStream = createReadStream(req.file.buffer)

    const uploadParams: IUploadToS3Params = {
      Bucket: bucketName,
      Body: imageStream,
      Key: req.file.filename
    }

    const uploadData = await s3.upload(uploadParams).promise()

    return {
      hasFile: true,
      data: {
        uploadData: uploadData
      }
    }
  } catch (error) {
    //TODO: trocar pro um logger de produção
    console.error(error)
    return {
      hasFile: false,
    }
  }
}
