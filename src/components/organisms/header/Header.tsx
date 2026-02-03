import Logo from "../../../assets/svg/logo.svg?react";
import { AuthArea } from "../../molecules/auth_area/AuthArea";
import { Navbar } from "../../molecules/navbar/Navbar";
import "./Header.css";

export function Header() {
    return (
        <header className="header shadow-2 bg-blur">
            <Logo className="w-7 md:w-9 text-grey-2 hidden md:block" aria-label="Argos logo" />
            <Navbar />
            <AuthArea />
        </header>
    )
}