import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';

export function Layout() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <div className="absolute w-screen h-dvh inset-0 bg-dark-rgba-2 md:bg-grey-rgba-2">
            <Outlet />
        </div>
    );
};