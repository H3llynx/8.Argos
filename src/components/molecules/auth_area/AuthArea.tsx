import { NavLink } from "react-router";
import Logout from "../../../assets/svg/logout.svg?react";
import Paw from "../../../assets/svg/paw.svg?react";
import { useAuth } from "../../../features/auth/hooks/useAuth";
import { signOut } from "../../../features/auth/services/auth";
import { Loading } from "../../atoms/Loading/Loading";
import "./AuthArea.css";

export function AuthArea() {
    const { user, loading } = useAuth();
    return (
        <div>
            {loading && <Loading />}
            {!user && !loading &&
                < NavLink to="/auth" tabIndex={0} className="auth-cta text-dark">
                    <Paw className="w-1.5 -rotate-10" aria-hidden="true" />
                    <span className="font-caveat text-3xl">Sign in</span>
                </NavLink>
            }
            {
                user && !loading &&
                <button onClick={signOut} tabIndex={0} className="auth-cta text-grey-2">
                    <Logout aria-hidden="true" />
                    Sign out
                </button>
            }
        </div >
    )
}