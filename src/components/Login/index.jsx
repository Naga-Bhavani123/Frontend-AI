import { useState } from "react";
import Cookie from "js-cookie"
import { useNavigate } from "react-router-dom";
import "./index.css";

export default function Auth() {
    const navigate = useNavigate()
    const [name, setName] = useState(""); 
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState(""); 
    const [loginPage, setChangePage] = useState(true)
    const [error, setError] = useState("")

    const onchangeName = (event) => {
        setName(event.target.value)
    }

    const onchangeEmail = (event) => {
        setEmail(event.target.value)
    }
      
    const onchangePassword = (event) => {
        setPassword(event.target.value)
    }

    const checkingWithLogin = async () => {
        try{
            console.log({email, password})
            const options = {
            method: "POST", 
            headers: {
                "Content-Type":"application/json"
            },
           
            body: JSON.stringify({
                email, 
                password
            }) }
        
            console.log(password)

        const response = await fetch("http://localhost:5000/auth/login", options)
         const parsedRes = await response.json()
        console.log(parsedRes)
        if (response.ok){
          Cookie.set("jwt-token", parsedRes.token, {expires: 30})
          navigate("/")
        }else{
          setError(parsedRes.msg)

        }


        }catch(error){
            console.log(error)
        }

        
    }
    
   
    const onSubmitForm = (event) => {
        event.preventDefault(); 
        
       
            checkingWithLogin()

       
    }


    return (
        <div className="auth-container">
            <div className="auth-card">

                <h1  className="title">
                   Wellcome back </h1>

                <p className="subtitle">
          Login to continue
        </p> 

         <form onSubmit = {onSubmitForm}>

           <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={onchangeEmail}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={onchangePassword}
              required
            />
          </div>

          <button  type="submit" className="auth-btn">
            Login
          </button>
          <p>{error}</p>

         </form>
         <p className = "switch-text">Don’t have an account?{" "}
          <button className = "switch-btn" type = "button" onClick = {(() => navigate("/register"))}>
            Sign up
          </button></p>

            </div>

        </div>
    )
  
}
