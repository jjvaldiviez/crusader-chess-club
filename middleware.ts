import { withAuth } from "next-auth/middleware";

export default withAuth({
    callbacks: {
        authorized: ({ token }) => {
            // You can add custom logic here, e.g., checking for an 'admin' role
            // return token?.role === "admin";
            return !!token; // Returns true if the user is logged in
        },
    },
});

export const config = {
    // Protect all routes under /admin
    matcher: ["/admin/:path*"],
};