
import { Response, Request, NextFunction } from "express";

export default function schemaValidator(schema:any){
   return (req:Request, res:Response, next:NextFunction)=>{
        const body  = req.body  
        const bodyValidation = schema.validate(body)
        if (bodyValidation.error){
            console.log(bodyValidation.error.details)
            return res.status(422).send(bodyValidation.error.details)
        }
        next()
    }
}
 