import express, {Request, Response} from 'express'
import verifyAuthToken from '../middleware/verifyAuthToken';
import verifyValidId from '../middleware/verifyValidId';
import { Order, OrderStore } from '../models/orders'
import { Product } from '../models/products';

const store = new OrderStore();

const showCurrent = async(req:Request, res:Response) =>{
    const userId = req.body.id;

    const orders = await store.showCurrent(userId);

    res.json(orders);
}

const showCompleted = async(req: Request, res:Response) =>{
    const userId = req.body.id;

    const orders = await store.showCompleted(userId);

    res.json(orders);
}

const showProducts = async(req:Request, res:Response) =>{
    const orderId = req.params.id;

    const products = await store.showProducts(orderId);

    res.json(products);
}

const addProduct = async(req:Request, res:Response) =>{
    const orderId = req.params.id;
    const productId = req.body.productId;
    const quanity = parseInt(req.body.quanity);

    const order = await store.addProduct(orderId,productId,quanity);

    res.json(order);
}

const createOrder = async (req:Request, res:Response) =>{
    const userId = req.body.id;
    const status = req.body.status;

    const o:Order = {
        id: "",
        status: status,
        user_id: userId
    }

    const order = await store.createOrder(o);

    res.json(order);
}

const middleware = [verifyValidId, verifyAuthToken];

const orderRoutes = (app: express.Application) =>{
    app.get('/orders', middleware, showCurrent);
    app.get('/orders/completed', middleware, showCompleted)
    app.get('/orders/:id/products', middleware, showProducts)
    app.post('/orders/:id/products', middleware, addProduct)
    app.post('/orders', middleware, createOrder);
}

export default orderRoutes;