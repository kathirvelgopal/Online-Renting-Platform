import { Router } from "express"
import {getItem, addOrUpdateItem,deleteItem} from "../controllers/item.controller"

const router: Router = Router()
// get all the items
router.get("/", getItem)
// add items 
router.post("/", addOrUpdateItem)
// update items
router.put("/:id", addOrUpdateItem)
// delete items
router.delete("/:id", deleteItem)

export default router;