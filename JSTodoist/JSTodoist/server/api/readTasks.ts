import { sql } from "../db";

export default defineEventHandler(async (event) => {
    const response = await sql`select id, task, due_date, completed from todos;`
    return response
})