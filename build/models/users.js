"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStore = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = process.env.SALT_ROUNDS;
class UserStore {
    // Index [token required] 'users' [GET]
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM users';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not fetch users. Error: ${err}`);
        }
    }
    // Show [token required] 'users/:id' [GET]
    async show(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM users WHERE id = $1';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find user with id: ${id}. Error: ${err}`);
        }
    }
    // Create [token required] 'users' [POST]
    async create(u) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'INSERT INTO users (username, firstName, lastName, password_digest) VALUES($1,$2,$3,$4) RETURNING *';
            // password hashing
            const hash = bcrypt_1.default.hashSync(u.password_digest + pepper, parseInt(saltRounds));
            const result = await conn.query(sql, [u.username, u.firstName, u.lastName, hash]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Unable to create user: ${u.username}. Error: ${err}`);
        }
    }
}
exports.UserStore = UserStore;
