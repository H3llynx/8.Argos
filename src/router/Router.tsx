import { createHashRouter } from "react-router";
import { Layout } from "../components/templates/layout/Layout";
import { Auth } from "../features/auth/Auth";
import { Home } from "../features/home/Home";
import { Map } from "../features/map/Map";

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
            {
                path: '/map',
                element: <Map />
            },
        ]
    }
]);