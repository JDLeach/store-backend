import { Request, Response, NextFunction } from "express";


// verify that sent id is a valid number
// this middleware assumes that a request will have EITHER a body id OR a params id
// NOT BOTH
const verifyValidBodyId = (req:Request, res:Response, next:NextFunction)=>{
    const id = req.body.id;
    if (isNaN(id)){
        res.status(500);
        return res.json("Invalid ID used");
    }
    next();
}

const verifyValidParamId = (req:Request, res:Response, next:NextFunction)=>{
    const id = req.params.id;
    if (isNaN(parseInt(id))){
        res.status(500);
        return res.json("Invalid ID used");
    }
    next();
}


export {verifyValidBodyId, verifyValidParamId}