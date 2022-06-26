"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductStore = void 0;
const database_1 = __importDefault(require("../database"));
class ProductStore {
    // Index: 'products' [GET]
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM products';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not fetch products. Error: ${err}`);
        }
    }
    //Show: 'products/:id' [GET]  
    async show(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM products WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find product with id of: ${id}. Error: ${err}`);
        }
    }
    //Create [token required]: 'products' [POST]
    async create(p) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'INSERT INTO products (name, price, category) VALUES($1,$2,$3) RETURNING *';
            const result = await conn.query(sql, [p.name, p.price, p.category]);
            const product = result.rows[0];
            conn.release();
            return product;
        }
        catch (err) {
            throw new Error(`Unable to create new product ${p.name}. Error: ${err}`);
        }
    }
}
exports.ProductStore = ProductStore;
