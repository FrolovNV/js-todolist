import postgres from 'postgres'

export const sql = postgres({
    username: 'myuser',
    password: 'mypassword',
    host: 'localhost',
    database: 'mydatabase',
    port: 7777
})