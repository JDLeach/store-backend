CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    status varchar(20),
    user_id bigint REFERENCES users(id)
);