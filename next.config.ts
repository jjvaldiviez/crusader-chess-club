import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    //Required when using webpack config in Next.js 16
    turbopack: {
        root: process.cwd(), // explicitly set your project root
    },

    // key for Next.js 15+ to prevent bundling of server-side packages
    serverExternalPackages: ["knex"],

    //Prevent Next.js from bundling optional Knex drivers
    webpack: (config) => {
        config.externals = {
            ...(config.externals || {}),
            tedious: "commonjs tedious",
            "pg-native": "commonjs pg-native",
            sqlite3: "commonjs sqlite3",
            "better-sqlite3": "commonjs better-sqlite3",
            oracledb: "commonjs oracledb",
            mysql: "commonjs mysql",
        };
        return config;
    },
};

export default nextConfig;
