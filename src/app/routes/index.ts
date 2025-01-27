import { Router } from "express";
import { UserRoute } from "../modules/auth/auth.route";
import { AdminRoute } from "../modules/admin/admin.route";
import { productRoute } from "../modules/products/product.route";
import { OrderRoutes } from "../modules/order/order.route";


const router = Router()

const moduleRoutes = [
    {
        path: '/auth',
        route: UserRoute
    },
    {
        path: '/admin',
        route: AdminRoute
    },
    {
        path: '/products',
        route: productRoute
    },
    {
        path: '/orders',
        route: OrderRoutes
    },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router