import express, {Request, Response} from 'express';
import verifyAuthToken from '../middleware/verifyAuthToken';
import verifyValidId from '../middleware/verifyValidId';
import { Product, ProductStore } from '../models/products';


const store = new ProductStore();

const index = async(_req: Request, res:Response) =>{
    const products = await store.index();
    res.json(products);
}

const show = async(req:Request, res:Response) =>{
    const product = await store.show(req.params.id);
    res.json(product == null ? "No product available with that id." : product)
}

const create = async (req:Request, res:Response) =>{
    const price = req.body.price;
    if (isNaN(price)){
        res.status(500);
        return res.send("Non-Number used for price. Please correct price.")
    }
    const p:Product = {
        id: "",
        name: req.body.name,
        price: req.body.price,
        category: req.body.category
    }
    const product = await store.create(p);

    res.json(product);
    
}

const productRoutes = (app: express.Application) => {
    app.get('/products', index)
    app.get('/products/:id', verifyValidId, show)
    app.post('/products', verifyAuthToken, create)
}

export default productRoutes;