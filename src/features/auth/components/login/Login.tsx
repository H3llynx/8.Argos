import { useEffect } from 'react';
import { useForm, } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useAuth } from '../../hooks/useAuth.tsx';
import { signIn } from '../../services/auth.ts';
import type { Credentials } from "../../types.ts";

export function Login() {
    const { register, handleSubmit, formState: { isSubmitting } } = useForm<Credentials>();
    const navigate = useNavigate();
    const { user, loading } = useAuth();

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
        <>
            {loading && <p>Loading...</p>}
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="email"
                    placeholder="Email"
                    {...register('email')}
                    required
                />

                <input
                    type="password"
                    placeholder="Mot de passe"
                    {...register('password', {
                        minLength: {
                            value: 6,
                            message: "Minimum 5 characters"
                        }
                    })}
                    required />

                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "checking..." : "Login"}
                </button>
            </form>
        </>
    );
}