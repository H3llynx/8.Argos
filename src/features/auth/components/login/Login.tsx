import { useEffect, useRef, useState } from 'react';
import { useForm, } from 'react-hook-form';
import { useNavigate } from 'react-router';
import Cat from "../../../../assets/images/cat3.jpg";
import Paw from "../../../../assets/svg/paw.svg?react";
import { Button } from '../../../../components/atoms/Button/Button.tsx';
import { Input } from '../../../../components/atoms/Input/Input.tsx';
import { Loading } from '../../../../components/atoms/Loading/Loading.tsx';
import { Popup } from '../../../../components/molecules/popup/Popup.tsx';
import "../../Auth.css";
import { customAuthErrors } from '../../config.ts';
import { useAuth } from '../../hooks/useAuth.tsx';
import { signIn } from '../../services/auth.ts';
import type { Credentials } from "../../types.ts";

export function Login() {
    const { register, handleSubmit, formState: { isSubmitting } } = useForm<Credentials>();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const popupRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (user) {
            navigate("/")
        }
    })

    useEffect(() => {
        if (errorMessage) {
            popupRef.current?.showModal();
        }
    }, [errorMessage])

    async function onSubmit(formData: Credentials) {
        const { error } = await signIn(formData);
        if (error) {
            if (error.code && typeof error.code === "string") {
                setErrorMessage(customAuthErrors[error.code as keyof typeof customAuthErrors] ||
                    "Unexpected paw-blem! Try again later. 🐾");
            } else {
                setErrorMessage("Server taking a catnap 🐱‍💤. Check your internet and try again!");
            }
        } else {
            navigate("/");
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}
                className="auth-form"
            >
                <Input
                    label="email"
                    id="email"
                    type="email"
                    placeholder="Email"
                    {...register("email")}
                    required
                />

                <Input
                    label="password"
                    id="password"
                    type="password"
                    {...register("password")}
                    required
                />

                <Button variant="authentication" disabled={isSubmitting}>
                    {isSubmitting
                        ? <Loading />
                        :
                        <>
                            <Paw aria-hidden="true" className="paw w-1" />
                            Sign in
                        </>
                    }
                </Button>
            </form>
            <Popup
                ref={popupRef}
                close={() => popupRef.current?.close()}
                variant="auth"
            >
                <p>{errorMessage}</p>
                <img src={Cat} alt="" className="w-full" />
            </Popup>
        </>
    );
}