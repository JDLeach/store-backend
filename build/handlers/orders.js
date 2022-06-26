"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const verifyAuthToken_1 = __importDefault(require("../middleware/verifyAuthToken"));
const verifyValidId_1 = __importDefault(require("../middleware/verifyValidId"));
const orders_1 = require("../models/orders");
const store = new orders_1.OrderStore();
const showCurrent = async (req, res) => {
    const userId = req.body.id;
    const orders = await store.showCurrent(userId);
    res.json(orders);
};
const showCompleted = async (req, res) => {
    const userId = req.body.id;
    const orders = await store.showCompleted(userId);
    res.json(orders);
};
const showProducts = async (req, res) => {
    const orderId = req.params.id;
    const products = await store.showProducts(orderId);
    res.json(products);
};
const addProduct = async (req, res) => {
    const orderId = req.params.id;
    const productId = req.body.productId;
    const quanity = parseInt(req.body.quanity);
    const order = await store.addProduct(orderId, productId, quanity);
    res.json(order);
};
const createOrder = async (req, res) => {
    const userId = req.body.id;
    const status = req.body.status;
    const o = {
        id: "",
        status: status,
        user_id: userId
    };
    const order = await store.createOrder(o);
    res.json(order);
};
const middleware = [verifyValidId_1.default, verifyAuthToken_1.default];
const orderRoutes = (app) => {
    app.get('/orders', middleware, showCurrent);
    app.get('/orders/completed', middleware, showCompleted);
    app.get('/orders/:id/products', middleware, showProducts);
    app.post('/orders/:id/products', middleware, addProduct);
    app.post('/orders', middleware, createOrder);
};
exports.default = orderRoutes;
