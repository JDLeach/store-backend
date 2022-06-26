import Client from "../database"
import bcrypt from 'bcrypt';

export type User = {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    password_digest: string;
};

const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = process.env.SALT_ROUNDS!;

export class UserStore {

    // Index [token required] 'users' [GET]
    async index(): Promise<User[]>{
        try{
            const conn = await Client.connect();
            const sql = 'SELECT * FROM users';

            const result = await conn.query(sql);

            conn.release();

            return result.rows;
        } catch(err){
            throw new Error(`Could not fetch users. Error: ${err}`);
        }
    }

    // Show [token required] 'users/:id' [GET]
    async show(id:string): Promise<User>{
        try{
            const conn = await Client.connect();
            const sql = 'SELECT * FROM users WHERE id = $1';

            const result = await conn.query(sql, [id]);

            conn.release();

            return result.rows[0];
        } catch (err){
            throw new Error(`Could not find user with id: ${id}. Error: ${err}`);
        }
    }

    // Create [token required] 'users' [POST]
    async create(u:User): Promise<User>{
        try{
            const conn = await Client.connect();
            const sql = 'INSERT INTO users (username, firstName, lastName, password_digest) VALUES($1,$2,$3,$4) RETURNING *';
            
            // password hashing
            const hash = bcrypt.hashSync(u.password_digest + pepper, parseInt(saltRounds));

            const result = await conn.query(sql, [u.username, u.firstName, u.lastName, hash]);

            conn.release();

            return result.rows[0];
        } catch(err){
            throw new Error(`Unable to create user: ${u.username}. Error: ${err}`);
        }
    }
}