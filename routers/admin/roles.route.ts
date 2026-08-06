import { Router } from "express";
import { CreateRoleController, DeleteRoleController, DetailRoleController, GetRoleController, UpdateRoleController } from "../../controllers/admin/roles.controller";

const route = Router();


route.post("/", CreateRoleController);
route.get("/", GetRoleController)
route.put("/:id", UpdateRoleController);
route.get("/:id", DetailRoleController);
route.delete("/:id", DeleteRoleController)
export default route;