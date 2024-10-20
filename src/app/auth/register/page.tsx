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
        <div>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        {validation.errors && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                                {validation.errors.map((error, index) => (
                                    <p className="text-sm" key={index}>{error.path} : {error.msg}</p>
                                ))}
                            </div>
                        )}
                        {loginFailed.message && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                                <p className="text-sm">
                                    {loginFailed.message}
                                </p>
                            </div>
                        )}

                        <form className="card-body" onSubmit={register}>
                            <div className="text-xl text-center font-semibold lg:px-[120px] px-28">
                                <h1>Register</h1>
                            </div>

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
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input
                                    className="input input-bordered text-black"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Name"
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    className="input input-bordered text-black"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email"
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
                                    />
                                </div>
                            </div>

                            <div className="form-control mt-6">
                                <button type="submit" className="btn btn-primary">Register</button>
                            </div>

                            <div className="mt-10 text-center flex flex-col gap-5">
                                <div>
                                    <Link href="/auth/login">Kembali ke halaman login..? <span className="text-sky-600">Login</span></Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
