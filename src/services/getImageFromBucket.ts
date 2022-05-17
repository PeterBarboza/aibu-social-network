import { Request } from "express"

import { s3, bucketName } from "../s3"

import { IGetFromS3Params } from "../types/IS3"

export async function getImageFromBucket(imgKey: string) {

  if (!imgKey) {
    return {
      hasFile: false
    }
  }

  try {
    const downloadParams: IGetFromS3Params = {
      Bucket: bucketName,
      Key: imgKey
    }

    const imgStream = s3.getObject(downloadParams).createReadStream()

    return {
      hasFile: true,
      data: {
        imgStream: imgStream
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