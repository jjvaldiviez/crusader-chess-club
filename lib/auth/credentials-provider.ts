import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

export const emailPasswordProvider = CredentialsProvider({
    name: "Credentials",
    credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
    },

    async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
            throw new Error("Missing email or password");
        }

        // Look up user
        const user = await prisma.user.findUnique({
            where: { email: credentials.email }
        });

        if (!user) {
            throw new Error("User not found");
        }

        // Validate password
        const isValid = await bcrypt.compare(
            credentials.password,
            user.password
        );

        if (!isValid) {
            throw new Error("Invalid password");
        }

        // Return user object
        return {
            id: user.id,
            email: user.email,
            role: user.role
        };
    }
});
