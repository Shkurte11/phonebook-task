import mysql from "mysql2/promise";

export const db = async () => {
    try {
        const connection = await mysql.createConnection({
            host: "127.0.0.1",
            user: "root",
            password: 'shkurte123',
            database: "phonebook"
        });

        console.log('Connected to the MySQL database.');
        return connection;
    } catch (err) {
        console.error('Error connecting to the database:', err.message);
        throw err;
    }
};
