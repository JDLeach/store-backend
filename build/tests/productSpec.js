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
const { TOKEN_SECRET } = process.env;
beforeAll(async () => {
    token = jsonwebtoken_1.default.sign({ test: 'test text' }, TOKEN_SECRET);
});
describe('Product endpoint responses', () => {
    it('GET products index endpoint', async () => {
        const response = await request.get('/products');
        expect(response.status).toBe(200);
    });
    it('GET products show endpoint', async () => {
        const response = await request.get('/products/1');
        expect(response.status).toBe(200);
    });
    it('POST products create endpoint', async () => {
        const response = await request.post('/products')
            .set('Authorization', 'bearer ' + token)
            .send({
            name: "test",
            price: 10,
            category: "cat"
        });
        expect(response.status).toBe(200);
    });
    it('VERIFY that POST endpoint fails with no jwt token', async () => {
        const response = await request.post('/products')
            .send({
            name: "test",
            price: 10,
            category: "cat"
        });
        expect(response.status).toBe(401);
    });
    it('VERIFY that POST endpoint fails with a bad jwt token', async () => {
        const badToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
        const response = await request.post('/products')
            .set('Authorization', 'bearer ' + badToken)
            .send({
            name: "test",
            price: 10,
            category: "cat"
        });
        expect(response.status).toBe(401);
    });
});
