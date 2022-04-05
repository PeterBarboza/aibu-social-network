import { connect } from "mongoose"
import "dotenv/config"

const uri = process.env.DB_URI

async function connectToMongoDB() {
  try {
    await connect(uri as string)
    //TODO: Substituir logs por um logger de produção
    console.log("Successfully connected to MongoDB")
  } catch (error) {
    //TODO: Substituir logs por um logger de produção
    console.error(error)
  }
}

export { connectToMongoDB }
