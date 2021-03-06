"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const verifyAuthToken_1 = __importDefault(require("../middleware/verifyAuthToken"));
const verifyValidIds_1 = require("../middleware/verifyValidIds");
const orders_1 = require("../models/orders");
const store = new orders_1.OrderStore();
const showCurrent = async (req, res) => {
    const userId = req.params.id;
    try {
        const orders = await store.showCurrent(userId);
        res.json(orders);
    }
    catch (e) {
        res.status(400);
        res.json(e);
    }
};
const showCompleted = async (req, res) => {
    const userId = req.params.id;
    try {
        const orders = await store.showCompleted(userId);
        res.json(orders);
    }
    catch (e) {
        res.status(400);
        res.json(e);
    }
};
const showProducts = async (req, res) => {
    const orderId = req.params.id;
    try {
        const products = await store.showProducts(orderId);
        res.json(products);
    }
    catch (e) {
        res.status(400);
        res.json(e);
    }
};
const addProduct = async (req, res) => {
    const orderId = req.params.id;
    const productId = req.body.productId;
    const quanity = parseInt(req.body.quanity);
    try {
        const order = await store.addProduct(orderId, productId, quanity);
        res.json(order);
    }
    catch (e) {
        res.status(400);
        res.json(e);
    }
};
const createOrder = async (req, res) => {
    const userId = req.body.id;
    const status = req.body.status;
    const o = {
        id: "",
        status: status,
        user_id: userId
    };
    try {
        const order = await store.createOrder(o);
        res.json(order);
    }
    catch (e) {
        res.status(400);
        res.json(e);
    }
};
const orderRoutes = (app) => {
    app.get('/orders/:id', [verifyAuthToken_1.default, verifyValidIds_1.verifyValidParamId], showCurrent);
    app.get('/orders/completed/:id', [verifyAuthToken_1.default, verifyValidIds_1.verifyValidParamId], showCompleted);
    app.get('/orders/:id/products', [verifyAuthToken_1.default, verifyValidIds_1.verifyValidParamId], showProducts);
    app.post('/orders/:id/products', [verifyAuthToken_1.default, verifyValidIds_1.verifyValidParamId], addProduct);
    app.post('/orders', verifyAuthToken_1.default, createOrder);
};
exports.default = orderRoutes;
