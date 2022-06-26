"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const products_1 = require("../products");
const store = new products_1.ProductStore();
describe("Products Model", () => {
    describe('Products toBeDefined Checks', () => {
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
    describe("Products Return Checks", () => {
        it('index should return an array', async () => {
            const products = await store.index();
            expect(products).toEqual(jasmine.any(Array));
        });
        it('show should return an object', async () => {
            const products = await store.show("1");
            expect(products).toEqual(jasmine.any(Object));
        });
        it('create should return an object', async () => {
            const p = {
                id: "",
                name: "Test Name",
                price: "10.00",
                category: "Test Cat"
            };
            const product = await store.create(p);
            expect(product).toEqual(jasmine.any(Object));
        });
    });
});
