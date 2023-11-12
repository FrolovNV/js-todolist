CREATE TABLE
IF NOT EXISTS todos
(
    id serial PRIMARY KEY,
    task text NOT NULL,
    due_date date,
    completed boolean
);