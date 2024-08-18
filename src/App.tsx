import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createContext, useState } from "react";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Market from "./pages/Market";
import Basket from "./pages/Basket";
import Admin from "./pages/Admin";

import { UserProvider, User } from "./contexts/UserContext";

import Navbar from "./components/Navbar";

import "./style/default.css";

export default function App() {
   const [user, setUser] = useState<User | null>(null);

   return (
      <UserProvider initialUser={user}>
         <div className="main">
            <Navbar></Navbar>
            <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/home" element={<Home />} />
               <Route path="/login" element={<Login />} />
               <Route path="/register" element={<Register />} />
               <Route path="/market" element={<Market />} />
               <Route path="/admin" element={<Admin />} />
               <Route path="/basket" element={<Basket />} />
            </Routes>
         </div>
      </UserProvider>
   );
}
