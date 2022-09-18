import app from "./app.js";
import dotenv from "dotenv";
dotenv.config();
var port = process.env.PORT;
app.listen(port || 4001, function () {
    console.log("serve on air on port: ", port);
});
