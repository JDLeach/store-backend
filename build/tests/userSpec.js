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
describe('Users endpoint responses', () => {
    it('GET users index endpoint', async () => {
        const response = await request.get('/users')
            .set('Authorization', 'bearer ' + token);
        expect(response.status).toBe(200);
    });
    it('VERIFY that GET index endpoint fails with no jwt token', async () => {
        const response = await request.get('/users');
        expect(response.status).toBe(401);
    });
    it('VERIFY that GET index endpoint fails with a bad jwt token', async () => {
        const response = await request.get('/users')
            .set('Authorization', 'bearer ' + badToken);
        expect(response.status).toBe(401);
    });
    it('GET users show endpoint', async () => {
        const response = await request.get('/users/1')
            .set('Authorization', 'bearer ' + token);
        expect(response.status).toBe(200);
    });
    it('VERIFY that GET show endpoint fails with no jwt token', async () => {
        const response = await request.get('/users/1');
        expect(response.status).toBe(401);
    });
    it('VERIFY that GET show endpoint fails with a bad jwt token', async () => {
        const response = await request.get('/users/1')
            .set('Authorization', 'bearer ' + badToken);
        expect(response.status).toBe(401);
    });
    it('POST users create endpoint', async () => {
        const response = await request.post('/users')
            .set('Authorization', 'bearer ' + token)
            .send({
            username: "test",
            firstName: "firstname",
            lastName: "lastName",
            password: "test"
        });
        expect(response.status).toBe(200);
    });
});
