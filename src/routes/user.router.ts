import { Router } from "express"
import {  addOrUpdateUser,getUser ,deleteUser} from "../controllers/user.controller"

const router: Router = Router()
//get all user
router.get("/", getUser)
// add user
router.post("/", addOrUpdateUser)
// update user
router.put("/:id", addOrUpdateUser)
// delete user
router.delete("/:id", deleteUser)

export default router;