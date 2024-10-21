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
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="bg-slate-500 px-10 py-10 rounded-lg w-full md:mt-0 sm:max-w-md xl:p-0">
                <form className="p-6" onSubmit={login}>
                    <div className="text-center text-2xl font-semibold">
                        <h1>Login</h1>
                    </div>

                    {error && (
                        <div className="text-lg flex justify-center bg-slate-700 rounded-md py-3 shadow-lg my-5 text-pink-500">
                            {error}
                        </div>
                    )}

                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                        <input 
                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="text" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            placeholder="Username" required 
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password" required
                        />
                    </div>

                    <div className="justify-center flex mt-10 gap-5">
                        <button className="bg-sky-500 text-center py-3 px-8 rounded-lg hover:bg-sky-600 duration-300" type="submit" disabled={loading}>
                            {loading ? 'Loading...' : 'Login'}
                        </button>
                        {/* <div className="bg-emerald-500 text-center py-3 px-8 rounded-lg hover:bg-emerald-600 duration-300">
                            <Link href="/"> <>Kembali</></Link>
                        </div> */}
                    </div>

                    <div>
                        <div>
                            <div className="mt-5 text-center">
                                <Link className="font-light" href="/register">Belum punya akun..? <span className="text-sky-400">Register</span></Link>
                            </div>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    );
}
