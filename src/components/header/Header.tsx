import { NavLink } from "react-router";
import Logo from "../../assets/svg/logo.svg?react";
import Paw from "../../assets/svg/paw.svg?react";
import { useAuth } from "../../features/auth/hooks/useAuth";
import { signOut } from "../../features/auth/services/auth";
import { Navbar } from "../navbar/Navbar";
import "./Header.css";

export function Header() {
    const { user } = useAuth();
    return (
        <header className="header shadow-2 bg-blur">
            <Logo className="w-7 md:w-9 text-grey-2 hidden md:block" aria-label="Argos logo" />
            <Navbar />
            {!user &&
                <NavLink to="/auth"
                    className="flex gap-0.5 relative z-1 text-dark hover:text-turquoise">
                    <Paw className="w-1.5 -rotate-10" aria-hidden="true" />
                    <span className="font-caveat text-3xl">Login</span>
                </NavLink>
            }
            {user && <button onClick={signOut}>Logout</button>}
        </header>
    )
}