import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { useUser } from "../contexts/UserContext";

import "../style/auth.css";

export default function Login() {
   const navigate = useNavigate();

   const { setUserData } = useUser();

   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   function Login() {
      console.log(email);
      console.log(password);
      signInWithEmailAndPassword(auth, email, password)
         .then((userCredential) => {
            console.log("User logged in : " + userCredential.user.email);
            const userData = {
               email: email,
               username: password,
            };
            setUserData(userData);
            navigate("/market");
         })
         .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
         });
   }

   return (
      <div className="auth-container">
         <div className="auth-header title">
            <p>Login</p>
         </div>
         <div className="auth-panel">
            <div className="auth-item">
               <p className="email-header big">Email</p>
               <div className="email-input">
                  <input
                     className="login-email"
                     type="input"
                     title="Email"
                     placeholder="Enter email..."
                     onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setEmail(e.target.value);
                     }}
                  />
               </div>
            </div>
            <div className="auth-item">
               <p className="password-header big">Password</p>
               <div className="password-input">
                  <input
                     className="login-password"
                     type="input"
                     title="Password"
                     placeholder="Enter password..."
                     onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setPassword(e.target.value);
                     }}
                  />
               </div>
            </div>
            <div>
               <button
                  type="button"
                  className="login-button button"
                  onClick={Login}
               >
                  Login
               </button>
            </div>
         </div>
      </div>
   );
}
