import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import { Footer } from '../../organisms/footer/Footer';
import { Header } from '../../organisms/header/Header';

export function Layout() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <>
            <div className="absolute w-screen h-dvh inset-0 bg-dark-rgba-2 md:bg-grey-rgba-2 z-0" />
            <div className="w-screen min-h-dvh flex flex-col justify-between relative z-1">
                <Header />
                <Outlet />
                <Footer />
            </div>
        </>
    );
};