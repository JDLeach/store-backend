"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const request = (0, supertest_1.default)(server_1.default);
let token = '';
const badToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
const { TOKEN_SECRET } = process.env;
beforeAll(async () => {
    token = jsonwebtoken_1.default.sign({ test: 'test text' }, TOKEN_SECRET);
});
describe('Order endpoint responses', () => {
    it('GET orders showCurrent endpoint', async () => {
        const response = await request.get('/orders/1')
            .set('Authorization', 'bearer ' + token);
        expect(response.status).toBe(200);
    });
    it('VERIFY that GET showCurrent endpoint fails with no jwt token', async () => {
        const response = await request.get('/orders/1');
        expect(response.status).toBe(401);
    });
    it('VERIFY that GET showCurrent endpoint fails with a bad jwt token', async () => {
        const response = await request.get('/orders/1')
            .set('Authorization', 'bearer ' + badToken);
        expect(response.status).toBe(401);
    });
    it('GET orders showCompleted endpoint', async () => {
        const response = await request.get('/orders/completed/1')
            .set('Authorization', 'bearer ' + token);
        expect(response.status).toBe(200);
    });
    it('VERIFY that GET showCompleted endpoint fails with no jwt token', async () => {
        const response = await request.get('/orders/completed/1');
        expect(response.status).toBe(401);
    });
    it('VERIFY that GET showCompleted endpoint fails with a bad jwt token', async () => {
        const response = await request.get('/orders/completed/1')
            .set('Authorization', 'bearer ' + badToken);
        expect(response.status).toBe(401);
    });
    it('GET orders showProducts endpoint', async () => {
        const response = await request.get('/orders/1/products')
            .set('Authorization', 'bearer ' + token);
        expect(response.status).toBe(200);
    });
    it('VERIFY that GET showProducts endpoint fails with no jwt token', async () => {
        const response = await request.get('/orders/1/products');
        expect(response.status).toBe(401);
    });
    it('VERIFY that GET showProducts endpoint fails with a bad jwt token', async () => {
        const response = await request.get('/orders/1/products')
            .set('Authorization', 'bearer ' + badToken);
        expect(response.status).toBe(401);
    });
    it('POST orders addProduct endpoint', async () => {
        const response = await request.post('/orders/1/products')
            .send({
            productId: 1,
            quanity: 10
        })
            .set('Authorization', 'bearer ' + token);
        expect(response.status).toBe(200);
    });
    it('VERIFY that POST addProduct endpoint fails with no jwt token', async () => {
        const response = await request.post('/orders/1/products')
            .send({
            productId: 1,
            quanity: 10
        });
        expect(response.status).toBe(401);
    });
    it('VERIFY that POST addProduct endpoint fails with a bad jwt token', async () => {
        const response = await request.post('/orders/1/products')
            .send({
            productId: 1,
            quanity: 10
        })
            .set('Authorization', 'bearer ' + badToken);
        expect(response.status).toBe(401);
    });
    it('POST orders createOrder endpoint', async () => {
        const response = await request.post('/orders')
            .send({
            user_productId: 1,
            status: "active"
        })
            .set('Authorization', 'bearer ' + token);
        expect(response.status).toBe(200);
    });
    it('VERIFY that POST createOrder endpoint fails with no jwt token', async () => {
        const response = await request.post('/orders')
            .send({
            user_id: "1",
            status: "active"
        });
        expect(response.status).toBe(401);
    });
    it('VERIFY that POST createOrder endpoint fails with a bad jwt token', async () => {
        const response = await request.post('/orders')
            .send({
            user_id: "1",
            status: "active"
        })
            .set('Authorization', 'bearer ' + badToken);
        expect(response.status).toBe(401);
    });
});
