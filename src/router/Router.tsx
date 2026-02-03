import { createHashRouter } from "react-router";
import { Layout } from "../components/templates/layout/Layout";
import { Auth } from "../features/auth/Auth";
import { Home } from "../features/home/Home";

export const Router = createHashRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: '/auth',
                element: <Auth />
            },
        ]
    }
]);