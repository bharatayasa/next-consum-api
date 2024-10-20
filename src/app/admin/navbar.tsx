"use client"
import React from "react";
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation';

export default function NavbarAdmin() {
    const router = useRouter();

    const logout = () => {
        Cookies.remove("token");
        Cookies.remove("user");
        router.replace("/login");
    }

    return (
        <div className="flex gap-2">
            <div>
                hallo world navbar admin
            </div>
            <div>
                <button className="bg-red-600 px-3 py-3" onClick={logout} style={{ cursor: "pointer" }}>
                    Logout
                </button>
            </div>
        </div>
    );
}
