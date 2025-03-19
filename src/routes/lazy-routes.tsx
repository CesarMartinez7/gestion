import { lazy } from "react";


export const Main = lazy(() => import("./main"))
export const Pedidos = lazy(() => import("./pedidos"))
export const Productos = lazy(() => import("./productos"))
export const Categorias = lazy(() => import("./categorias"))
export const NotFoundPage = lazy(() => import("./notfound"))
export const Login = lazy(() => import("./user-registrer"))