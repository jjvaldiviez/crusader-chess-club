"use client";

import Link from "next/link";
import { useState } from "react";

export default function RegistrationPage() {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        uscfId: "",
        tournamentId: "",
        section: "Open",
    });

    const [isSubmitted, setIsSubmitted] = useState(false);

    // Mock data for tournaments dropdown
    const upcomingTournaments = [
        { id: "1", name: "Winter Open 2025" },
        { id: "2", name: "Spring Blitz" },
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle submission logic here
        console.log("Form submitted:", formData);
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
                <main className="flex w-full max-w-md flex-col items-center rounded-lg border border-zinc-200 bg-white p-10 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                    <h2 className="mb-4 text-2xl font-bold text-black dark:text-white">Registration Confirmed!</h2>
                    <p className="mb-6 text-zinc-600 dark:text-zinc-400">
                        Thank you for registering. A confirmation email has been sent to {formData.email}.
                    </p>
                    <div className="flex gap-4">
                        <Link
                            href="/dashboard"
                            className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
                        >
                            Go to Dashboard
                        </Link>
                        <Link
                            href="/tournaments"
                            className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
                        >
                            Browse More
                        </Link>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black py-12 px-4 sm:px-6">
            <main className="w-full max-w-2xl bg-white dark:bg-zinc-900 p-8 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-black dark:text-white">Tournament Registration</h1>
                    <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                        Fill out the details below to secure your spot in an upcoming event.
                    </p>
                </header>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Information */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold text-black dark:text-white">Player Details</h2>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label htmlFor="fullName" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    required
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm placeholder-zinc-400 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:focus:border-white dark:focus:ring-white"
                                />
                            </div>
                            <div>
                                <label htmlFor="uscfId" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                    USCF ID
                                </label>
                                <input
                                    type="text"
                                    id="uscfId"
                                    name="uscfId"
                                    required
                                    value={formData.uscfId}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm placeholder-zinc-400 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:focus:border-white dark:focus:ring-white"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm placeholder-zinc-400 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:focus:border-white dark:focus:ring-white"
                            />
                        </div>
                    </div>

                    <hr className="border-zinc-200 dark:border-zinc-800" />

                    {/* Event Selection */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold text-black dark:text-white">Event Information</h2>
                        <div>
                            <label htmlFor="tournamentId" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                Select Tournament
                            </label>
                            <select
                                id="tournamentId"
                                name="tournamentId"
                                required
                                value={formData.tournamentId}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-black shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:focus:border-white dark:focus:ring-white"
                            >
                                <option value="" disabled>Select an event...</option>
                                {upcomingTournaments.map((t) => (
                                    <option key={t.id} value={t.id}>
                                        {t.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="section" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                Section
                            </label>
                            <select
                                id="section"
                                name="section"
                                value={formData.section}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-black shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:focus:border-white dark:focus:ring-white"
                            >
                                <option value="Open">Open</option>
                                <option value="U1800">Under 1800</option>
                                <option value="U1400">Under 1400</option>
                                <option value="Scholastic">Scholastic (K-12)</option>
                            </select>
                        </div>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            className="w-full rounded-md bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-400"
                        >
                            Complete Registration
                        </button>
                        <p className="mt-4 text-center text-sm text-zinc-500">
                            <Link href="/" className="underline hover:text-zinc-800 dark:hover:text-zinc-300">
                                Cancel and return home
                            </Link>
                        </p>
                    </div>
                </form>
            </main>
        </div>
    );
}