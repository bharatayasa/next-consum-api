"use client"
import "../globals.css";
import { useContext, useEffect } from "react";
import { AuthProvider, AuthContext } from '../context/context';
import NavbarMenu from "./navbar";
import { useRouter } from 'next/navigation';

export default function UserLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter();
    const authContext = useContext(AuthContext);

    useEffect(() => {
        if (authContext && !authContext.isAuthenticated) {
            router.replace('/auth/login');
        }
    }, [authContext, router]);

    return (
        <AuthProvider>
            <NavbarMenu />
            <div>{children}</div>
        </AuthProvider>
    );
}
