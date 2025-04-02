import React from 'react'
import Dashboard from './pages/Dashboard'
import Navbar from "./Components/Navbar";
import { Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import { Navigate} from 'react-router-dom';

const PrivateRoute = ({ element }) => {
  const getemail = localStorage.getItem("Email");
  return getemail ? element : <Navigate to="/login" />;
};

const App = () => {
  const getemail = localStorage.getItem("Email");
  return (
    <div>
       <Navbar/>
       <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/" element={<PrivateRoute element = {<Dashboard/>}/>} />
        </Routes>
    </div>
  )
}

export default App
