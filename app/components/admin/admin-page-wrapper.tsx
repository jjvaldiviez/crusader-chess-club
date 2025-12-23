"use client";

import React from "react";
import {AdminNavBar} from "@/app/components/admin/admin-navbar";
import {Footer} from "@/app/components/common/footer";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";

interface AdminWrapperProps {
    children: React.ReactNode;
    className?: string;
    centered?: boolean;
    withNavbar?: boolean;
    withFooter?: boolean;
}

export function AdminPageWrapper({
                                    children,
                                    className = "",
                                    centered = true,
                                    withNavbar = true,
                                    withFooter = true}: AdminWrapperProps) {
    const {data: session, status} = useSession();
    const router = useRouter();

    React.useEffect(() => {
        if (status === "loading") return;

        if (!session || session.user?.role !== "ADMIN") {
            router.push("/auth/signin");
        }
    }, [session, status, router]);

    if (status === "loading") {
        return (
            <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
                <div className="text-center">Loading...</div>
            </div>
        );
    }

    if (!session || session.user?.role !== "ADMIN") {
        return null;
    }

    return (
        <div className="flex min-h-screen flex-col bg-zinc-50 font-sans dark:bg-black">
            {withNavbar && <AdminNavBar />}
            <main
                className={`flex flex-1 flex-col px-6 py-8 ${
                    centered ? "items-center justify-center" : ""
                } ${className}`}
            >
                <div className="mx-auto w-full max-w-5xl">
                    {children}
                </div>
            </main>
            {withFooter && <Footer />}
        </div>
    );
}