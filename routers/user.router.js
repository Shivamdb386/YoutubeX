import { Router } from "express"
import {registerUser,loginuser, logoutuser, accessRefreshToken} from "../controllers/user.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"

const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginuser)
router.route("/logout").post(verifyJWT,logoutuser)
router.route("/refresh-token").post(accessRefreshToken)



export default router