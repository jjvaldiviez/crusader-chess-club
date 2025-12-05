import React from 'react';

interface HeroProps {
    children: React.ReactNode;
    className?: string;
    centered?: boolean;
}

export function HeroSection({
                                    children,
                                    className = "",
                                    centered = true,
                                }: HeroProps) {
    return (
        <div
            className={`min-h-screen bg-zinc-50 font-sans dark:bg-black ${
                centered ? "flex items-center justify-center" : ""
            } ${className}`}
        >
            {children}
        </div>
    );
}