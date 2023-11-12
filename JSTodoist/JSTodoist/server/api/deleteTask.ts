import { sql } from "../db";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const id = body.id;
    const result = await sql`DELETE FROM todos WHERE id = ${id}`
    return result
})