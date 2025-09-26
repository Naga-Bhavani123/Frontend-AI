import "./index.css"
import {useState, useEffect} from "react"
import { useNavigate} from "react-router-dom";
import Cookie from "js-cookie"


const Register = () => {
    const [name, setName] = useState(""); 
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState(""); 
    const [isRegister, setRegister] = useState(false)
    const [message, setMessage] = useState("")
    const navigate = useNavigate()

    const onchangeName = (event) => {
        setName(event.target.value)
    }

    const onchangeEmail = (event) => {
        setEmail(event.target.value)
    }
      
    const onchangePassword = (event) => {
        setPassword(event.target.value)
    }

    const checkingWithRegister = async () => {
       try{
                setMessage("")

        const options = {
            method: "post", 
            headers: {
                "Content-Type": "application/json", 
                "Accept" : "application/json"
            }, 
            body: JSON.stringify({
                name,
                email, 
                password
            })
        }



        const response = await fetch("http://localhost:5000/auth/register", options)
           const parsedRes = await response.json()
           console.log(parsedRes)
           
          if (response.ok){

            Cookie.remove("jwt-token")
           
            setRegister((prv) => !prv)
           }
          setMessage(parsedRes.message)
           
       }catch(error){
        console.log(error)
       }

    }

    const onSubmitForm = (event) => {
      event.preventDefault(); 
      checkingWithRegister()
       
    }

    
    useEffect(() => {
  if (isRegister) {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 3000);

    return () => clearTimeout(timer); // cleanup if component unmounts
  }
}, [isRegister]);


      return (
        <div className={`auth-container ${isRegister ? "blur" : ""}`}>
            <div className="auth-card">

                <h1  className="title">Create Account</h1>

                <p className="subtitle">Sign up to get started</p> 

         <form onSubmit = {onSubmitForm}>

            
                <div className="input-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={name}
                onChange={onchangeName}
                required
              />
            </div>
            
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

          <button onClick={checkingWithRegister}  type="submit" className="auth-btn">
            Sign up
          </button>

         </form>
         <p>{message}</p>
         <p className = "switch-text"> Already have an account? {" "}
          <button className = "switch-btn" type = "button" onClick={() => navigate("/login")}>
            Login
          </button></p>

            </div>


        </div>
    )




}


export default Register