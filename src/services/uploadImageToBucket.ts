import { Request } from "express"
import { createReadStream, unlink } from "fs"

import { s3, bucketName } from "../s3"
import { User } from "../models/user"

import { IUploadToS3Params } from "../types/IS3"

export async function uploadImageToBucket(req: Request) {
  const user_id = req.headers._id

  const apiUrl = process.env.API_URL

  if (!req.file) {
    return {
      hasFile: false
    }
  }

  try {
    const imageStream = createReadStream(req.file.path)

    //TODO: Criar um nome único e aleatório para a chave "Key"

    const unikeKey = `${req.file.filename}${user_id}${Date.now()}`

    const uploadParams: IUploadToS3Params = {
      Bucket: bucketName,
      Body: imageStream,
      Key: unikeKey
    }

    const uploadData = await s3.upload(uploadParams).promise()

    const imgUrl = `${apiUrl}/user/images/${unikeKey}`

    await User.updateOne({ _id: user_id }, { imgUrl: imgUrl })

    unlink(req.file.path, (err) => {
      if (err) {
        console.error(err)
      }
      console.log('image was deleted')
    })

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
