import { sql } from "../db";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const id = body.id;
    const completed = body.completed;
    const result = await sql`
    UPDATE todos
    SET completed = ${completed}
    WHERE id = ${id};`
    return result
})