import express, {Request, Response} from 'express';
import { User, UserStore } from '../models/users';
import jwt from 'jsonwebtoken';
import {verifyValidParamId} from '../middleware/verifyValidIds';
import verifyAuthToken from '../middleware/verifyAuthToken';

const store = new UserStore();

// return a list of users
const index = async(_req:Request, res:Response) =>{
    let users:User[];
    try{
        users = await store.index();
        res.send(users);
    }catch(e){
        res.status(400);
        res.json(e);
    }
}

// return a specific user
const show = async(req: Request, res: Response) =>{
    let user: User;
    try{
        user = await store.show(req.params.id);
        res.json(user == null ? "No user found with that id" : user);
    }catch(e){
        res.status(400);
        res.json(e);
    }
}

// create a user
const create = async(req:Request, res:Response) =>{
    const username = req.body.username;
    const password_digest = req.body.password;
    if (!username || !password_digest){
        res.status(500);
        return res.json("Username and password cannot be empty");
    }
    const u:User = {
        id: "",
        username: username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password_digest: password_digest
    };
    try{
        const user = await store.create(u);
        const token = jwt.sign({u: user}, process.env.TOKEN_SECRET!);
        res.json(token);

    }catch (e){
        res.status(400);
        res.json(e);
    }
}



const userRoutes = (app: express.Application) =>{
    app.get('/users', verifyAuthToken, index)
    app.get('/users/:id', [verifyAuthToken, verifyValidParamId], show)
    app.post('/users', create)
}

export default userRoutes;