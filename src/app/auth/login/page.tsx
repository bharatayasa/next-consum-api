"use client"
import React, { useState, useContext, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import api from '../../../api';
import Cookies from 'js-cookie';
import { AuthContext } from '../../context/context';

interface LoginResponse {
    data: {
        user: {
            id: number;
            username: string;
            role: string;
        };
        token: string;
    };
    success: boolean;
    message: string;
}

export default function Login() {
    const router = useRouter();
    const { setIsAuthenticated, setUserRole } = useContext(AuthContext) || {};
    const [loading, setLoading] = useState<boolean>(false);
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const login = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await api.post<LoginResponse>('/login', {
                username: username,
                password: password,
            });

            const { success, data, message } = response.data;

            if (!success) {
                setError(message);
                return;
            }

            const { token, user } = data;

            Cookies.set('token', token);
            Cookies.set('user', JSON.stringify(user));

            setIsAuthenticated?.(true);
            setUserRole?.(user.role);

            if (user.role === 'admin') {
                router.push("/admin/dashboard");
            } else if (user.role === 'user') {
                router.push("/user/home");
            }

        } catch (error) {
            setError('Login failed. Please check your credentials.');
            console.error("Error during login:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col">
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form className="card-body" onSubmit={login}>
                            <div className="text-xl text-center font-semibold lg:px-36 px-28">
                                <h1>Login</h1>
                            </div>

                            {error && (
                                <div className="alert alert-error">
                                    <span>{error}</span>
                                </div>
                            )}

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Username</span>
                                </label>
                                <input
                                    className="input input-bordered text-black"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Username"
                                    required
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <div className="relative">
                                    <input
                                        className="input input-bordered w-full text-black"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Password"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-control mt-6">
                                <button className="btn btn-primary" type="submit" disabled={loading}>
                                    {loading ? 'Loading...' : 'Login'}
                                </button>
                            </div>

                            <div className="form-control">
                                <div className="mt-10 text-center flex flex-col gap-5">
                                    <div>
                                        <Link href="/auth/register">Belum punya akun..? <span className="text-sky-600">Register</span></Link>
                                    </div>
                                    <div>
                                        <Link href="/"> <span className="text-sky-600">Kembali</span></Link>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
