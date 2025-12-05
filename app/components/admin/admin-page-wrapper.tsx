import React from "react";
import {AdminNavBar} from "@/app/components/admin/admin-navbar";
import {Footer} from "@/app/components/common/footer";

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