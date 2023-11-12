import { sql } from "../db";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const text = body.text;
    const currentDate = new Date();
    console.log(currentDate);

    const response = await sql`
    insert into todos 
    (task, due_date, completed)
    values
    (${text}, ${currentDate}, ${false})
    returning id, task, due_date, completed
    ;
    `
    console.log(response);
    // console.log(response[0].due_date);
    return response[0]
})