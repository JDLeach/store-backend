import { parse } from 'dotenv';
import Client from '../database'
import { Product } from './products';

export type Order = {
    id: string;
    status: string;
    user_id: number;
}

// TODO Setup a way to create an order if it doesn't already exist when a product is added?

export class OrderStore {
    // index - Current Orders by user (args: user id)[token required] 'orders' [GET]
    async showCurrent(id: string): Promise<Order[]> {
        try {
            const conn = await Client.connect();
            const sql = "SELECT * FROM orders WHERE user_id=($1) AND status = 'active'";

            const result = await conn.query(sql, [id]);

            conn.release();

            return result.rows;
        } catch (err) {
            throw new Error(`Unable to fetch orders by id: ${id}. Error: ${err}`);
        }
    }

    // index - Completed Orders by user (args: user id)[token required] 'orders/completed' [GET] 
    async showCompleted(id: string): Promise<Order[]> {
        try {
            const conn = await Client.connect();
            const sql = "SELECT * FROM orders WHERE user_id=($1) AND status='completed'";

            const result = await conn.query(sql, [id]);

            conn.release();

            return result.rows;
        } catch (err) {
            throw new Error(`Unable to fetch completed orders by id: ${id}. Error: ${err}`);
        }
    }
    
    // showProducts - Show a product list of an order [token required] 'orders/:id/products' [GET]

    async showProducts(orderId: string):Promise<Product[]>{
        try{
            const conn = await Client.connect();
            const sql = 'SELECT * FROM products INNER JOIN order_products ON products.id=order_products.product_id WHERE order_products.order_id = ($1);';

            const result = await conn.query(sql,[orderId]);

            conn.release();

            return result.rows;
        }catch (err){
            throw new Error(`Unable to fetch products in order. Error: ${err}`)
        }
    }

    // addProduct - Add a product to an order [token required] 'orders/:id/products' [POST]
    async addProduct(orderId: string, productId: string, quantity: number,): Promise<Order>{
        try{
            const conn = await Client.connect();
            const sql = 'INSERT INTO order_products (order_id, product_id, quantity) VALUES($1,$2,$3) RETURNING *'

            const result = await conn.query(sql, [orderId,productId, quantity]);

            const order = result.rows[0];

            return order;
        } catch(e){
            throw new Error(`Unable to add product to order. Error: ${e}`)
        }
    }

    // create - create a new order [token required] 'orders' [POST]
    async createOrder (o:Order):Promise<Order>{
        try{
            const conn = await Client.connect();
            const sql = 'INSERT INTO orders (status,user_id) VALUES($1,$2) RETURNING *';

            const result = await conn.query(sql,[o.status,o.user_id]);

            conn.release();

            return result.rows[0];
        }catch (err){
            throw new Error(`Could not create new order. Error: ${err}`)
        }
    }

}