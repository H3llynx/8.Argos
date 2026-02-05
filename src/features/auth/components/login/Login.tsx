import { useEffect } from 'react';
import { useForm, } from 'react-hook-form';
import { useNavigate } from 'react-router';
import Paw from "../../../../assets/svg/paw.svg?react";
import { Button } from '../../../../components/atoms/Button/Button.tsx';
import { Input } from '../../../../components/atoms/Input/Input.tsx';
import { Loading } from '../../../../components/atoms/Loading/Loading.tsx';
import "../../Auth.css";
import { useAuth } from '../../hooks/useAuth.tsx';
import { signIn } from '../../services/auth.ts';
import type { Credentials } from "../../types.ts";

export function Login() {
    const { register, handleSubmit, formState: { isSubmitting } } = useForm<Credentials>();
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            navigate("/")
        }
    })

    async function onSubmit(formData: Credentials) {
        const { error } = await signIn(formData);
        if (error) {
            alert(error);
        } else {
            navigate("/");
        }
    }

    return (
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
    );
}