"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../users");
const store = new users_1.UserStore();
describe('Users Model', () => {
    describe('Users toBeDefined Checks', () => {
        it('should have index method', () => {
            expect(store.index).toBeDefined();
        });
        it('should have show method', () => {
            expect(store.show).toBeDefined();
        });
        it('should have create method', () => {
            expect(store.create).toBeDefined();
        });
    });
    describe('Users Return Checks', () => {
        it('index should return an array', async () => {
            const users = await store.index();
            expect(users).toEqual(jasmine.any(Array));
        });
        it('show should return an object', async () => {
            const user = await store.show("1");
            expect(user).toEqual(jasmine.any(Object));
        });
        it('create should return an object', async () => {
            const u = {
                id: "",
                username: "testusername",
                firstName: "firstName",
                lastName: "lastName",
                password_digest: "password"
            };
            const user = await store.create(u);
            expect(user).toEqual(jasmine.any(Object));
        });
    });
});
