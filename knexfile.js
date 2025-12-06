export default {
    development: {
        client: "mysql2",
        connection: {
            host: "127.0.0.1",
            port: 3306,
            user: "appuser",
            password: "apppass",
            database: "appdb",
        },
        pool: { min: 0, max: 10 },
    },
};
