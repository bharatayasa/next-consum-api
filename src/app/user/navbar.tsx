"use client"
import React from "react";
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavbarMenu() {
    const router = useRouter();
    const pathName = usePathname();

    const logout = () => {
        Cookies.remove("token");
        Cookies.remove("user");
        router.replace("/login");
    }

    return (
        <nav className="flex justify-between bg-slate-500 py-2 px-5">
            <div>
                <h1 className="font-semibold text-2xl py-2">Chilitify</h1>
            </div>
            <div className="flex gap-5">
                <ul className="flex">
                    <Link href={'/user/home'}>
                        <li className={`${pathName === '/user/home' ? 'text-pink-600 bg-emerald-500 py-3 px-5 rounded-md hover:bg-emerald-600 duration-300': 'text-white bg-emerald-500/20 hover:bg-emerald-500 duration-300 rounded-lg py-3 px-5'}`}>Home</li>
                    </Link>
                </ul>
                <ul className="flex">
                    <Link href={'/user/predict'}>
                        <li className={`${pathName === '/user/predict' ? 'text-pink-600 bg-emerald-500 py-3 px-5 rounded-md hover:bg-emerald-600 duration-300': 'text-white bg-emerald-500/20 hover:bg-emerald-500 duration-300 rounded-lg py-3 px-5'}`}>Predict</li>
                    </Link>
                </ul>
                <ul className="flex">
                    <Link href={'/user/history'}>
                        <li className={`${pathName === '/user/history' ? 'text-pink-600 bg-emerald-500 py-3 px-5 rounded-md hover:bg-emerald-600 duration-300': 'text-white bg-emerald-500/20 hover:bg-emerald-500 duration-300 rounded-lg py-3 px-5'}`}>History</li>
                    </Link>
                </ul>
                <ul className="flex">
                    <Link href={'/user/about'}>
                        <li className={`${pathName === '/user/about' ? 'text-pink-600 bg-emerald-500 py-3 px-5 rounded-md hover:bg-emerald-600 duration-300': 'text-white bg-emerald-500/20 hover:bg-emerald-500 duration-300 rounded-lg py-3 px-5'}`}>About</li>
                    </Link>
                </ul>
            </div>
            <div>
                <button className="bg-pink-600 hover:bg-pink-500 px-3 py-3 rounded-md duration-300" onClick={logout} style={{ cursor: "pointer" }}>
                    Logout
                </button>
            </div>
        </nav>
    );
}
