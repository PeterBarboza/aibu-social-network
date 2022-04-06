import express from "express";
import "dotenv/config"

import { userRouter } from "./router/userRoutes"
import { postRouter } from "./router/postRoutes"
import { likeRouter } from "./router/likeRouter"
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/auth", userRouter)
app.use("/post", ensureAuthenticated, postRouter)
app.use("/like", ensureAuthenticated, likeRouter)

export { app, port }
