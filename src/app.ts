import express from "express"
import cors from "cors"
import swaggerUI from "swagger-ui-express"
import "dotenv/config"

import swaggerDocs from "./swagger.json"

import { router } from "./router"

const app = express()

const port = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//TODO: Proteger a api de forma corret com o CORS antes do deploy
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")

  res.header("Access-Control-Allow-Methods", "GET,PATCH,POST,DELETE")

  app.use(cors())

  next()
})

app.use("/v1/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs))

app.use("/v1", router)

export { app, port }
