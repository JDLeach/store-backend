import express, {Request, Response} from 'express'
import verifyAuthToken from '../middleware/verifyAuthToken';
import {verifyValidParamId} from '../middleware/verifyValidIds';
import { Order, OrderStore } from '../models/orders'

const store = new OrderStore();

const showCurrent = async(req:Request, res:Response) =>{
    const userId = req.params.id;
    try{
        const orders = await store.showCurrent(userId);
        res.json(orders);
    }catch(e){
        res.status(400);
        res.json(e);
    }
}

const showCompleted = async(req: Request, res:Response) =>{
    const userId = req.params.id;
    try{
        const orders = await store.showCompleted(userId);
        res.json(orders);
    }catch(e){
        res.status(400);
        res.json(e);
    }
}

const showProducts = async(req:Request, res:Response) =>{
    const orderId = req.params.id;

    try{
        const products = await store.showProducts(orderId);
        res.json(products);
    }catch(e){
        res.status(400);
        res.json(e);
    }
}

const addProduct = async(req:Request, res:Response) =>{
    const orderId = req.params.id;
    const productId = req.body.productId;
    const quanity = parseInt(req.body.quanity);

    try{
        const order = await store.addProduct(orderId,productId,quanity);
        res.json(order);
    }catch(e){
        res.status(400);
        res.json(e);
    }
}

const createOrder = async (req:Request, res:Response) =>{
    const userId = req.body.id;
    const status = req.body.status;

    const o:Order = {
        id: "",
        status: status,
        user_id: userId
    }
    try{
        const order = await store.createOrder(o);
        res.json(order);
    }catch(e){
        res.status(400);
        res.json(e);
    }
}

const orderRoutes = (app: express.Application) =>{
    app.get('/orders/:id', [verifyAuthToken, verifyValidParamId], showCurrent);
    app.get('/orders/completed/:id', [verifyAuthToken, verifyValidParamId], showCompleted)
    app.get('/orders/:id/products', [verifyAuthToken, verifyValidParamId], showProducts)
    app.post('/orders/:id/products', [verifyAuthToken, verifyValidParamId], addProduct)
    app.post('/orders', verifyAuthToken, createOrder);
}

export default orderRoutes;