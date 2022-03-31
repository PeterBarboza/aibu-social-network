import { connect } from "mongoose"
import "dotenv/config"

const uri = process.env.DB_URI

async function connectToMongoDB() {
  try {
    await connect(uri as string)
    console.log("Successfully connected to MongoDB")
  } catch (error) {
    console.log(error)
  }
}

export { connectToMongoDB }
