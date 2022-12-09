import mysql from "mysql";

export const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "vacaquevoa852!",
    database: "crud2"
});
