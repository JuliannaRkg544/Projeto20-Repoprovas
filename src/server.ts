import app from "./app.js"
import dotenv from "dotenv"
dotenv.config()

const port = process.env.PORT


app.listen(port||4001, ()=>{
    console.log(`serve on air on port: `, port)
})