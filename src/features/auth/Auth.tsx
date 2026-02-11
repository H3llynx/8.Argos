import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../../components/atoms/Button/Button";
import { Login } from "./components/Login/Login";
import { Register } from "./components/Register/Register";
import { useAuth } from "./hooks/useAuth";

export function Auth() {
    const navigate = useNavigate();
    const { user } = useAuth();
    useEffect(() => {
        if (user) {
            navigate("/")
        }
    }, [user]);

    const [isLogin, setIsLogin] = useState(true);

    return (
        <main className="my-auto">
            <section className="flex flex-col mx-auto gap-0.5 items-center">
                {isLogin &&
                    <>
                        <Login />
                        <Button variant="authentication2" onClick={() => setIsLogin(false)}>Register</Button>
                    </>
                }
                {!isLogin &&
                    <>
                        <Register />
                        <Button variant="authentication2" onClick={() => setIsLogin(true)}>Login</Button>
                    </>
                }
            </section>
        </main>
    )
}