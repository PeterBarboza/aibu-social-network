import { Router } from "express"

import { userRouter, authUserRouter } from "./userRouter"
import { postRouter } from "./postRouter"
import { commentRouter } from "./commentRouter"
import { likeRouter } from "./likeRouter"
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated"

const router = Router()

router.use("/user/auth", authUserRouter)
router.use("/user", ensureAuthenticated, userRouter)
router.use("/post", ensureAuthenticated, postRouter)
router.use("/like", ensureAuthenticated, likeRouter)
router.use("/comment", ensureAuthenticated, commentRouter)

export { router }