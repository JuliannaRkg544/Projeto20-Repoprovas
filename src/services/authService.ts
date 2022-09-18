import * as authReposiroty from "../repositories/authRepository.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config()

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
        throw{type:"conflict", message:"user already signed"}
    }
}

function hashPassword(password:string):string{
    const hashPass = bcrypt.hashSync(password, 10)
    return hashPass
}

async function signin(email:string, password:string){
    //verificar se email é cadastrado OK
    //verificar se senha bate com o do email OK
    //gerar token com jwt OK
    if (!email || !password) {
        throw { type: "unprocessable_entity", message: "invalid information" };
      }
    const user:authReposiroty.UserData = await authReposiroty.findUserByEmail(email)
    if(!user){
      throw{type:"not_found",message:"no user found"}
    }
    const token = veryfyPassword(password, user)
    return {email:email, token:token}
  }

  function veryfyPassword(password:string, user:authReposiroty.UserData):string{
    const rigthPassword =  user.password
    
    if (!(bcrypt.compareSync(password,rigthPassword))){
        throw { type: "unauthorized", message: "invalid password" };
    }
    const token = jwt.sign(password,process.env.JWT_SECRET)
    return token
  }


export {
    signup, signin
}