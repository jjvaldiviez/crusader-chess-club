"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export function Modal({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    const handleClose = () => {
        router.back();
    };

    // Close on ESC
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") handleClose();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <div
                className="relative max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-xl bg-white p-6 shadow-2xl dark:bg-zinc-950"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={handleClose}
                    className="absolute right-4 top-4 text-zinc-500 hover:text-black dark:text-zinc-400 dark:hover:text-white"
                >
                    ✕
                </button>
                {children}
            </div>
            {/* Backdrop click to close */}
            <div className="absolute inset-0 -z-10" onClick={handleClose} />
        </div>
    );
}