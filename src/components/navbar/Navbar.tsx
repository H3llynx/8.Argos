import { NavLink } from "react-router";
import Close from "../../assets/svg/close.svg?react";
import Logo from "../../assets/svg/logo.svg?react";
import Menu from "../../assets/svg/menu.svg?react";
import "./Navbar.css";

export function Navbar() {
    return (
        <nav className="navbar">
            <label htmlFor="menu-toggle" aria-label="open/close menu" className="menu-toggle">
                <input type="checkbox" className="sr-only" id="menu-toggle" />
                <Menu aria-hidden="true" className="menu-svg" />
                <Close aria-hidden="true" className="close-svg" />
            </label>
            <Logo className="w-6 text-grey-2 hidden" aria-label="Argos logo" />
            <ul>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/map">Map</NavLink></li>
                <li><NavLink to="/calendar">Calendar</NavLink></li>
                <li><NavLink to="/stats">Stats</NavLink></li>
            </ul>
        </nav>
    )
}