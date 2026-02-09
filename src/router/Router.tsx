import { createHashRouter } from "react-router";
import { Layout } from "../components/templates/layout/Layout";
import { Auth } from "../features/auth/Auth";
import { Calendar } from "../features/calendar/Calentar";
import { Home } from "../features/home/Home";
import { Map } from "../features/map/Map";
import { Stats } from "../features/stats/Stats";
import { ProtectedRoutes } from "./protectedRoutes";

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
                element: (
                    <ProtectedRoutes>
                        <Map />
                    </ProtectedRoutes>
                )
            },
            {
                path: '/stats',
                element: (
                    <ProtectedRoutes>
                        <Stats />
                    </ProtectedRoutes>
                )
            },
            {
                path: '/calendar',
                element: (
                    <ProtectedRoutes>
                        <Calendar />
                    </ProtectedRoutes>
                )
            }
        ]
    }
]);