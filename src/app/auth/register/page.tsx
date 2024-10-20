"use client"
import React, { useState, FormEvent } from "react";
import { useRouter } from 'next/navigation';
import api from '../../../api/index';
import Link from "next/link";

interface ValidationErrors {
    path: string;
    msg: string;
}

interface ValidationResponse {
    errors?: ValidationErrors[];
}

interface LoginFailedResponse {
    message?: string;
}

export default function Register() {
    const router = useRouter();

    const [username, setUsername] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [validation, setValidation] = useState<ValidationResponse>({});
    const [loginFailed, setLoginFailed] = useState<LoginFailedResponse>({});

    const register = async (e: FormEvent) => {
        e.preventDefault();

        try {
            await api.post('/register', {
                username,
                name,
                email,
                password,
            });
            router.push("/auth/login");
        } catch (error: any) {
            if (error.response) {
                setValidation(error.response.data);
                setLoginFailed(error.response.data);
            } else {
                setLoginFailed({ message: "An unexpected error occurred" });
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="bg-slate-500 px-10 py-10 rounded-lg w-full md:mt-0 sm:max-w-md xl:p-0">
                {validation.errors && (
                    <div>
                        {validation.errors.map((error, index) => (
                            <p key={index}>{error.path} : {error.msg}</p>
                        ))}
                    </div>
                )}
                {loginFailed.message && (
                    <div className="px-6">
                        <p className="text-lg flex justify-center bg-slate-700 rounded-md py-3 shadow-lg my-5 text-pink-500 text-center">
                            {loginFailed.message}
                        </p>
                    </div>
                )}
                <form className="p-6" onSubmit={register}>
                    <div className="text-center text-2xl font-semibold">
                        <h1>Register</h1>
                    </div>

                    <div>
                        <label>
                            <span>Username</span>
                        </label>
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                        />
                    </div>

                    <div>
                        <label>
                            <span>Name</span>
                        </label>
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Name"
                        />
                    </div>

                    <div>
                        <label>
                            <span>Email</span>
                        </label>
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                        />
                    </div>

                    <div>
                        <label>
                            <span>Password</span>
                        </label>
                        <div>
                            <input
                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                            />
                        </div>
                    </div>

                    <div className="justify-center flex mt-10 gap-5">
                        <button className="bg-sky-500 text-center py-3 px-8 rounded-lg hover:bg-sky-600 duration-300" type="submit">Register</button>
                    </div>
                    <div>
                        <div className="mt-5 text-center">
                            <Link className="font-light" href="/auth/login">Kembali ke halaman login..? <span className="text-sky-400">Login</span></Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
