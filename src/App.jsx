import { BrowserRouter, Routes, Route } from "react-router-dom"
import Folder from "./components/Folder"
import Login from "./components/Login"
import Home from "./components/SideBar"
import Register from "./components/Register"
import './App.css'

function App() {

  return (
    <BrowserRouter>
    <Routes>
          <Route path = "/login"  element = {<Login/>}/>
          <Route path = "/register" element = {<Register/>} />
          <Route path = "/" element = {<Home />}/>
          <Route path = "/folder/:id" element = {<Folder/>} />
    </Routes>
    </BrowserRouter>
 
  )
}

export default App
