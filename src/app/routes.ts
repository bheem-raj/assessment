import {Application} from "express"
import { AuthController } from "./modules/auth/auth.controller"
import { CategoryController } from "./modules/category/category.controller"
import { DishesController } from "./modules/dishes/dishes.controller"
import { UserController } from "./modules/user/user.controller"

export function registerRoutes(app: Application): void {
    new UserController().register(app)
    new AuthController().register(app)
    new CategoryController().register(app)
    new DishesController().register(app)
}
