import express from "express";
import "dotenv/config"

import { userRouter, authUserRouter } from "./router/userRoutes"
import { postRouter } from "./router/postRoutes"
import { likeRouter } from "./router/likeRouter"
import { commentRouter } from "./router/commentRouter"
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/user/auth", authUserRouter)
app.use("/user", ensureAuthenticated, userRouter)
app.use("/post", ensureAuthenticated, postRouter)
app.use("/like", ensureAuthenticated, likeRouter)
app.use("/comment", ensureAuthenticated, commentRouter)

export { app, port }
