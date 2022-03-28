import * as express from "express";
import "dotenv/config"

import { userRouter } from "./router/userRoutes"
import { postRouter } from "./router/postRoutes"

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use("/auth", userRouter)
app.use("/post", postRouter)

export { app, port }
