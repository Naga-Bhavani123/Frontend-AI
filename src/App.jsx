import { BrowserRouter, Routes, Route } from "react-router-dom"

import Login from "./components/Login"
import Home from "./components/Home"
import Register from "./components/Register"
import './App.css'

function App() {

  return (
    <BrowserRouter>
    <Routes>
          <Route path = "/login"  element = {<Login/>}/>
          <Route path = "/register" element = {<Register/>} />
          <Route path = "/" element = {<Home />}/>
    </Routes>
    </BrowserRouter>
 
  )
}

export default App
