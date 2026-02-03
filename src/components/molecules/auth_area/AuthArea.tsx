import { NavLink } from "react-router";
import Logout from "../../../assets/svg/logout.svg?react";
import Paw from "../../../assets/svg/paw.svg?react";
import { useAuth } from "../../../features/auth/hooks/useAuth";
import { signOut } from "../../../features/auth/services/auth";
import "./AuthArea.css";

export function AuthArea() {
    const { user } = useAuth();
    return (
        <div>
            {!user &&
                <NavLink to="/auth" className="auth-cta text-dark">
                    <Paw className="w-1.5 -rotate-10" aria-hidden="true" />
                    <span className="font-caveat text-3xl">Sign in</span>
                </NavLink>
            }
            {user &&
                <button onClick={signOut} className="auth-cta text-grey-2">
                    <Logout aria-hidden="true" />
                    Sign out
                </button>
            }
        </div>
    )
}