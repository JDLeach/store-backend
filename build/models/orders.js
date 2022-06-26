"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStore = void 0;
const database_1 = __importDefault(require("../database"));
// TODO Setup a way to create an order if it doesn't already exist when a product is added?
class OrderStore {
    // index - Current Orders by user (args: user id)[token required] 'orders' [GET]
    async showCurrent(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = "SELECT * FROM orders WHERE user_id=($1) AND status = 'active'";
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Unable to fetch orders by id: ${id}. Error: ${err}`);
        }
    }
    // index - Completed Orders by user (args: user id)[token required] 'orders/completed' [GET] 
    async showCompleted(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = "SELECT * FROM orders WHERE user_id=($1) AND status='completed'";
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Unable to fetch completed orders by id: ${id}. Error: ${err}`);
        }
    }
    // showProducts - Show a product list of an order [token required] 'orders/:id/products' [GET]
    async showProducts(orderId) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM products INNER JOIN order_products ON products.id=order_products.product_id WHERE order_products.order_id = ($1);';
            const result = await conn.query(sql, [orderId]);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Unable to fetch products in order. Error: ${err}`);
        }
    }
    // addProduct - Add a product to an order [token required] 'orders/:id/products' [POST]
    async addProduct(orderId, productId, quantity) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'INSERT INTO order_products (order_id, product_id, quantity) VALUES($1,$2,$3) RETURNING *';
            const result = await conn.query(sql, [orderId, productId, quantity]);
            const order = result.rows[0];
            return order;
        }
        catch (e) {
            throw new Error(`Unable to add product to order. Error: ${e}`);
        }
    }
    // create - create a new order [token required] 'orders' [POST]
    async createOrder(o) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'INSERT INTO orders (status,user_id) VALUES($1,$2) RETURNING *';
            const result = await conn.query(sql, [o.status, o.user_id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not create new order. Error: ${err}`);
        }
    }
}
exports.OrderStore = OrderStore;
