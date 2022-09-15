import * as authReposiroty from "../repositories/authRepository.js"
import bcrypt from "bcrypt"

async function signup(email:string, password:string){
    //buscar user por email OK
    // hasherizar senha
    // enviar para o banco
    await checkUserEmail(email)
    const hashPass = hashPassword(password)
    const userdata = {
        email,
        password:hashPass
    }  
     await authReposiroty.createUser(userdata)
    return userdata
}

async function checkUserEmail(email:string){
     const user = await authReposiroty.findUserByEmail(email)
    if(user){
        console.log(user)
        throw{type:"forbidden", message:"user already signed"}
    }
}

function hashPassword(password:string):string{
    const hashPass = bcrypt.hashSync(password, 10)
    return hashPass
}

async function signin(email:string, password:string){
    
  }

export {
    signup, signin
}