import S3 from "aws-sdk/clients/s3"
import "dotenv/config"

const bucketName = process.env.AWS_BUCKET_NAME as string
const bucketRegion = process.env.AWS_BUCKET_REGION as string
const accessKey = process.env.AWS_AIBU_ACCESS_KEY as string
const secretAccessKey = process.env.AWS_AIBU_SECRET_ACCESS_KEY as string

const s3 = new S3({
  region: bucketRegion,
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  }
})

export { s3, bucketName }