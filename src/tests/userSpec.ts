import jwt from 'jsonwebtoken'
import supertest from "supertest";
import app from "../server";

const request = supertest(app);
let token = '';
const badToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
const {TOKEN_SECRET} = process.env;

beforeAll(async() =>{
    token = jwt.sign({test: 'test text'}, TOKEN_SECRET!);
})

describe('Users endpoint responses', () =>{
    it('GET users index endpoint', async()=>{
        const response = await request.get('/users')
            .set('Authorization', 'bearer ' + token)
        expect(response.status).toBe(200);
    });
    it('VERIFY that GET index endpoint fails with no jwt token', async ()=>{
        const response = await request.get('/users');
        expect(response.status).toBe(401);
    })
    it('VERIFY that GET index endpoint fails with a bad jwt token', async ()=>{
        const response = await request.get('/users')
            .set('Authorization', 'bearer ' + badToken)
        expect(response.status).toBe(401);
    })
    it('GET users show endpoint', async ()=>{
        const response = await request.get('/users/1')
            .set('Authorization', 'bearer ' + token)
        expect(response.status).toBe(200);
    });
    it('VERIFY that GET show endpoint fails with no jwt token', async ()=>{
        const response = await request.get('/users/1');
        expect(response.status).toBe(401);
    })
    it('VERIFY that GET show endpoint fails with a bad jwt token', async ()=>{
        const response = await request.get('/users/1')
            .set('Authorization', 'bearer ' + badToken)
        expect(response.status).toBe(401);
    })
    it('POST users create endpoint', async ()=>{
        const response = await request.post('/users')
            .set('Authorization', 'bearer ' + token)
            .send({
                username:"test",
                firstName:"firstname",
                lastName:"lastName",
                password:"test"
            })
        expect(response.status).toBe(200);
    })
    
})