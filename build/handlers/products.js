"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const verifyAuthToken_1 = __importDefault(require("../middleware/verifyAuthToken"));
const products_1 = require("../models/products");
const verifyValidIds_1 = require("../middleware/verifyValidIds");
const store = new products_1.ProductStore();
const index = async (_req, res) => {
    try {
        const products = await store.index();
        res.json(products);
    }
    catch (e) {
        res.status(400);
        res.json(e);
    }
};
const show = async (req, res) => {
    try {
        const product = await store.show(req.params.id);
        res.json(product == null ? "No product available with that id." : product);
    }
    catch (e) {
        res.status(400);
        res.json(e);
    }
};
const create = async (req, res) => {
    const price = req.body.price;
    if (isNaN(price)) {
        res.status(500);
        return res.send("Non-Number used for price. Please correct price.");
    }
    const p = {
        id: "",
        name: req.body.name,
        price: req.body.price,
        category: req.body.category
    };
    try {
        const product = await store.create(p);
        res.json(product);
    }
    catch (e) {
        res.status(400);
        res.json(e);
    }
};
const productRoutes = (app) => {
    app.get('/products', index);
    app.get('/products/:id', verifyValidIds_1.verifyValidParamId, show);
    app.post('/products', verifyAuthToken_1.default, create);
};
exports.default = productRoutes;
