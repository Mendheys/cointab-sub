import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [Remail,setRemail] = useState("")
    const [Rpassword,setRpassword] = useState("");

    const [Lemail,setLemail] = useState("")
    const [Lpassword,setLpassword] = useState("");
    const nav = useNavigate()

    const handleRegister = async () => {
        const payload = {email : Remail,password : Rpassword}

        await fetch("http://localhost:4000/user/register", {
            method : "POST",
            body : JSON.stringify(payload),
            headers : { "Content-Type" : "application/json"}
        }).then((res) => localStorage.setItem("cointab-token", JSON.stringify({token : false})))
        

    }
    const handleLogin = async () => {
        const payload = {email : Lemail,password : Lpassword}
        await fetch("http://localhost:4000/user/login", {
            method : "POST",
            body : JSON.stringify(payload),
            headers : {"Content-Type" : "application/json"}
        }).then((res) => res.json()).then((res) => localStorage.setItem("cointab-token", JSON.stringify({token : res.token, user: res.user}))).then((res) => nav('/home')).catch((err) => console.log(err))
        

    }
  return (
    <div>
      <div>
        <h3>Register your self</h3>
        <div>
            <label>Enter Email : </label>
            <input type="email" placeholder="Enter your email" onChange={(e) => setRemail(e.target.value)}/>
            <br />
            <br />
            <label>Enter Password : </label>
            <input type="password" placeholder="Enter your password" onChange={(e) => setRpassword(e.target.value)} />
            <br /><br />
            <button onClick={handleRegister}>REGISTER</button>

        </div>
        <br /><br /><br />

        <div>
        <h3>Login Here</h3>
        <div>
            <label>Enter Email : </label>
            <input type="email" placeholder="Enter your email" onChange={(e) => setLemail(e.target.value)} />
            <br />
            <br />
            <label>Enter Password : </label>
            <input type="password" placeholder="Enter your password" onChange={(e) => setLpassword(e.target.value)} />
            <br /><br />
            <button onClick={handleLogin}>LOGIN</button>

        </div>

        </div>
      </div>
    </div>
  );
};

export default Login;
