import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Cata.20",
    database: "next",
});

export default connection;