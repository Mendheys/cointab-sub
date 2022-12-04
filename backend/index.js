const express = require("express")
const connection = require("./config/db")
const cors = require("cors")

//change name
const userController = require("../Backend/Routes/user.routes")

const authentication = require("../Backend/middleware/authentication")



const app = express();

app.use(cors())

app.use(express.json());

app.get("/", (req,res) => {
    res.send("HOME PAGE")
})

app.use("/user", userController)

app.use(authentication)



app.listen(4000, async () => {
    try{
        await connection
        console.log("DB connected Successfully")
    }
    catch(err){
        console.log("DB not connected ")
        // console.log(err)
    }
    console.log("ON PORT 4000")
})