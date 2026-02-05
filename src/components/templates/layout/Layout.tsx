import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import { Footer } from '../../organisms/footer/Footer';
import { Header } from '../../organisms/header/Header';
import "./Layout.css";

export function Layout() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <>
            <div className="layout">
                <Header />
                <Outlet />
                <Footer />
            </div>
        </>
    );
};