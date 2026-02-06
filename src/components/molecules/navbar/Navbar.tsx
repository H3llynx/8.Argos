import { useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router";
import Close from "../../../assets/svg/close.svg?react";
import Logo from "../../../assets/svg/logo.svg?react";
import Menu from "../../../assets/svg/menu.svg?react";
import { useAuth } from "../../../features/auth/hooks/useAuth";
import "./Navbar.css";

export function Navbar() {
    const { user } = useAuth();
    const location = useLocation();
    const getTabIndex = (path: string) => location.pathname === path ? -1 : 0;
    const menuToggleRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (menuToggleRef.current) {
            menuToggleRef.current.checked = false;
        }
    }, [location.pathname]);

    return (
        <nav className="navbar">
            <label htmlFor="menu-toggle" aria-label="open/close menu" className="menu-toggle">
                <input type="checkbox" className="sr-only" id="menu-toggle" ref={menuToggleRef} />
                <Menu aria-hidden="true" className="menu-svg" />
                <Close aria-hidden="true" className="close-svg" />
            </label>
            <Logo className="w-6 text-grey-2 hidden" aria-label="Argos logo" />
            <ul>
                <li><NavLink to="/" tabIndex={getTabIndex("/")}>Home</NavLink></li>
                {user && <>
                    <li><NavLink to="/map" tabIndex={getTabIndex("/map")}>Map</NavLink></li>
                    <li><NavLink to="/calendar" tabIndex={getTabIndex("/calendar")}>Calendar</NavLink></li>
                    <li><NavLink to="/stats" tabIndex={getTabIndex("/stats")}>Stats</NavLink></li>
                </>
                }
            </ul>
        </nav>
    )
}