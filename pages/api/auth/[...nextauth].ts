import NextAuth, {AuthOptions, User, Session} from "next-auth"
import GithubProvider from "next-auth/providers/github"
import {JWT} from "next-auth/jwt";


export const authOptions: AuthOptions = {
    session: {
        strategy: "jwt",
    },
    // Configure one or more authentication providers
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),
        // ...add more providers here
    ],
    callbacks: {
        async jwt({ token, user }: { token: JWT; user?: User }) {
            // Transfer the role from the user object to the token
            if (user) {
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }: { session: Session; token: JWT }) {
            // Transfer the role from the token to the session
            if (session.user) {
                session.user.role = token.role as string;
            }
            return session;
        },
    },
}

export default NextAuth(authOptions)