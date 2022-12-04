const express = require("express");
const UserModel = require("../models/User.model")
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const userController = express.Router();
const dateObj = new Date();
// ,"Date" : dateObj.getDate()



//for SignUp
userController.post("/register", (req, res) => {
    const {email, password} = req.body
    bcrypt.hash(password, 6, async function(err, hash) {
        // Store hash in your password DB.
        if(err){
            console.log("Something went wrong try again")
        }
        else{
            const user = new UserModel({
                email,
                password : hash,
                count_incorrect : 0,
                time : 0,
                minutes : 0
                
            })
            await user.save()
            res.send("Signup Successful")
        }
    });

})

//for Login

userController.post("/login", async(req, res) => {
    const {email, password} = req.body;

    const user = await UserModel.findOne({email})

    if(!user){
        return res.send("Invalid Email")
    }
    const hash = user.password
    const userId = user._id
        // console.log(hash,"TESTING")
        bcrypt.compare(password, hash, async function(err, result) {
            // result == true
            // && (user.time - dateObj.getHours() <= 0) && (user.minutes - dateObj.getMinutes() <= 0)
            if(result && (user.count_incorrect < 6) && ( ((user.time==0) && (user.minutes = 0)) || (user.time - dateObj.getHours() <= 0) && (user.minutes - dateObj.getMinutes() <= 0) )  ){
                const token = jwt.sign({email,userId}, 'secret');
                user.count_incorrect = 0;
                user.time = 0;
                user.minutes = 0;
                await user.save()

                 return res.send({"msg" : "login Success", "token" : token,"user" : user})
            }
            else if(user.count_incorrect >= 5){
                const time = dateObj.getHours();
                const min = dateObj.getMinutes()
                user.time = time;
                user.minutes = min;
                await user.save()

                return res.send({"msg" : "you can try after 24 hours", "time" : time , "minutes" : min})

            }
            
            
            else{

                user.count_incorrect++,
                await user.save()
                
                return res.send({"msg" : "LOGIN FAILED incorrect Password", "Remaning try" :  user.count_incorrect})
            }
        });
        
    
    
    

})

module.exports = userController
