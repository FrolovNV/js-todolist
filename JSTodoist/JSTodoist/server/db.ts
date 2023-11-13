import postgres from 'postgres'

export const sql = postgres({
    username: 'myuser',
    password: 'mypassword',
    host: process.env.POSTGRES_LOCALHOST as string,
    database: 'mydatabase',
    port: Number.parseInt(process.env.POSTGRES_PORT!)
})