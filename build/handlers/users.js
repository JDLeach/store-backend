"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../models/users");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyValidIds_1 = require("../middleware/verifyValidIds");
const verifyAuthToken_1 = __importDefault(require("../middleware/verifyAuthToken"));
const store = new users_1.UserStore();
// return a list of users
const index = async (_req, res) => {
    let users;
    try {
        users = await store.index();
        res.send(users);
    }
    catch (e) {
        res.status(400);
        res.json(e);
    }
};
// return a specific user
const show = async (req, res) => {
    let user;
    try {
        user = await store.show(req.params.id);
        res.json(user == null ? "No user found with that id" : user);
    }
    catch (e) {
        res.status(400);
        res.json(e);
    }
};
// create a user
const create = async (req, res) => {
    const username = req.body.username;
    const password_digest = req.body.password;
    if (!username || !password_digest) {
        res.status(500);
        return res.json("Username and password cannot be empty");
    }
    const u = {
        id: "",
        username: username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password_digest: password_digest
    };
    try {
        const user = await store.create(u);
        const token = jsonwebtoken_1.default.sign({ u: user }, process.env.TOKEN_SECRET);
        res.json(token);
    }
    catch (e) {
        res.status(400);
        res.json(e);
    }
};
const userRoutes = (app) => {
    app.get('/users', verifyAuthToken_1.default, index);
    app.get('/users/:id', [verifyAuthToken_1.default, verifyValidIds_1.verifyValidParamId], show);
    app.post('/users', create);
};
exports.default = userRoutes;
