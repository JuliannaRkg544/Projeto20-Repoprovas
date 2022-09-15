import { Request, Response } from "express";
import authRouter from "../routes/authRouter";
import * as authService from "../services/authService.js"

export async function signupUser(req:Request, res:Response){
    const {email, password}:{email:string, password:string}=req.body 
    await authService.signup(email,password)
    res.sendStatus(201)
}

export async function signinUser(req:Request, res:Response){
    const {email, password}:{email:string, password:string}=req.body 
    const user = await authService.signin(email,password)
    res.status(200).send(user)
}