import {Request,Response, NextFunction } from "express";


export default function errorHandler(error, req:Request, res:Response, next: NextFunction){
    console.log(error);
    if (error.type==='not_found') return res.status(404).send(error.type.message)
    if (error.type==='forbidden') return res.status(403).send(error.type.message)
    if(error.type==='conflict') return res.status(409).send(error.type.message)
    if(error.type ==='unauthorized') return res.sendStatus(401)
    if(error.type === 'unprocessable_entity') return res.sendStatus(422)
    return res.sendStatus(500)

}