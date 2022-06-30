import { OrderStore } from '../orders';
import {faker} from '@faker-js/faker'
import Client from '../../database';

const store = new OrderStore();

const createRandomProducts = ()=>{
    return {
        name: faker.commerce.product(),
        price: faker.commerce.price(),
        category: faker.commerce.department()
    }
}

// seed database with products, a user, and an order
beforeAll(async() =>{
    const conn = await Client.connect();
    const sql = "INSERT INTO products (name, price,category) VALUES($1,$2,$3)";
    Array.from({length: 10}).forEach(async () =>{
        const product = createRandomProducts();
        await conn.query(sql, [product.name,product.price,product.category])    
    })
    await conn.query("INSERT INTO users (username, firstName, lastName, password_digest) VALUES ($1,$2,$3,$4)", ["test", "testFirstName", "testLastName", "password"]);
    await conn.query("INSERT INTO orders (status, user_id) VALUES($1,$2)", ["active",1]);;

    conn.release();

})

describe('Orders Model', () => {

    describe('Orders toBeDefined Checks', () =>{
        // toBeDefined checks
        it('should have showCurrent method', () => {
            expect(store.showCurrent).toBeDefined();
        })
        it('should have showCompleted method', () => {
            expect(store.showCompleted).toBeDefined();
        })
        it('should have showProducts method', () => {
            expect(store.showProducts).toBeDefined();
        })
        it('should have addProduct method', () => {
            expect(store.addProduct).toBeDefined();
        })
    })

    // return checks
    describe('Orders Return Checks', () =>{
        it("showCurrent should return an array",async () =>{
            const orders = await store.showCurrent("1");
            expect(orders).toEqual(jasmine.any(Array))
        })
        it("showCompleted should return an array",async () =>{
            const orders = await store.showCompleted("1");
            expect(orders).toEqual(jasmine.any(Array))
        })
        it("showProducts should return an array",async () =>{
            const orders = await store.showProducts("1");
            expect(orders).toEqual(jasmine.any(Array))
        })
        it("addProduct should return an the new Product object",async () =>{
            const order = await store.addProduct("1", "2", 2);
            expect(order).toEqual(jasmine.any(Object))
        })
    })


})