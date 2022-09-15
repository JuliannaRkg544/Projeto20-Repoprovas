import client from "../config/database.js"
import {Users} from "@prisma/client"

export type UserData = Omit<Users, "id">

async function findUserByEmail(email:string) {
    return await client.users.findFirst({where:{email:email}})
    
}

async function createUser(userdata:UserData){
     await client.users.create({data:userdata})
}

export {
    findUserByEmail, createUser
}