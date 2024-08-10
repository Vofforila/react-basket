import React, { useState } from "react";

import { db } from "../firebase/firebase";
import { collection, addDoc, doc, getDocs } from "firebase/firestore";

export default function Register() {
   const [password, setPassowrd] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");

   const [usernameError, setUsernameError] = useState("");
   const [emailError, setEmailError] = useState("");
   const [passowrdError, setPassowrdError] = useState("");
   const [confirmPasswordError, setConfirmPasswordError] = useState("");

   function ValidateEmail(email: string) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
   }

   function isStrongPassword(password: string): string {
      const minLength = 8;

      const hasNumbers = /\d/;
      const hasSymbols = /[!@#$%^&*(),.?":{}|<>]/;

      if (password.length < minLength) {
         return "Password must be at least 8 characters long.";
      }

      if (!hasNumbers.test(password)) {
         return "Password must contain at least one number.";
      }

      if (!hasSymbols.test(password)) {
         return "Password must contain at least one special character.";
      }

      return "Password is strong.";
   }

   async function CheckCredentials(e: React.ChangeEvent<HTMLInputElement>) {
      if (e.target.name === "email") {
         if (ValidateEmail(e.target.value)) {
            setEmailError("");
         } else {
            setEmailError("email not valid");
            return;
         }
      }

      if (e.target.name === "password") {
         setPassowrdError(isStrongPassword(e.target.value));
         setPassowrd(e.target.value);
      } else if (e.target.name === "confirmPassowrd") {
         setConfirmPassword(e.target.value);
         if (password != confirmPassword) {
            setPassowrd("passwords don't mach")!;
         }
      }

      let check = false;
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc: any) => {
         const data = doc.data();

         console.log(e.target.name);
         if (e.target.value === data[e.target.name]) {
            check = true;
            if (e.target.name == "username") {
               setUsernameError("username already exists");
               return;
            }
            if (e.target.name == "email") {
               setEmailError("email already exists");
               return;
            }
         }

         if (check === true && e.target.name == "username") {
            setUsernameError("");
         } else if (check === true && e.target.name == "email") {
            setEmailError("");
         }
      });
   }
   return (
      <div className="auth-container">
         <div className="auth-header title">
            <p>Register</p>
         </div>
         <div className="auth-panel">
            <div className="auth-item">
               <div className="auth-item-splitter">
                  <p className="big auth-item-header">Username</p>
                  {usernameError && (
                     <p className="auth-item-error small mediumweight error">
                        {usernameError}
                     </p>
                  )}
               </div>
               <div className="username-input">
                  <input
                     className="register-username"
                     type="input"
                     placeholder="Enter username..."
                     title="register-username"
                     name="username"
                     onChange={CheckCredentials}
                     required
                  />
               </div>
            </div>
            <div className="auth-item">
               <div className="auth-item-splitter">
                  <p className="big auth-item-header">Email</p>
                  {emailError && (
                     <p className="auth-item-error small mediumweight error">
                        {emailError}
                     </p>
                  )}
               </div>
               <div className="email-input">
                  <input
                     className="email-input"
                     type="input"
                     title="email-input"
                     name="email"
                     placeholder="Enter email..."
                     onChange={CheckCredentials}
                  />
               </div>
            </div>
            <div className="auth-item">
               <div className="auth-item-splitter">
                  <p className="big auth-item-header">Password</p>
                  {passowrdError && (
                     <p className="auth-item-error small mediumweight error">
                        {passowrdError}
                     </p>
                  )}
               </div>
               <div className="password-input">
                  <input
                     className="register-password"
                     type="input"
                     title="register-password"
                     placeholder="Enter password..."
                     name="password"
                     onChange={CheckCredentials}
                  />
               </div>
            </div>
            <div className="auth-item">
               <div className="auth-item-splitter">
                  <p className="big auth-item-header">Confirm Password</p>
                  {confirmPasswordError && (
                     <p className="auth-item-error small mediumweight error">
                        {confirmPasswordError}
                     </p>
                  )}
               </div>
               <div className="password-input">
                  <input
                     className="register-confirm-password"
                     type="input"
                     title="register-confirm-password"
                     placeholder="Confirm password..."
                     name="confirmPassowrd"
                     onChange={CheckCredentials}
                  />
               </div>
            </div>
            <div>
               <button type="button" className="login-button button">
                  Login
               </button>
            </div>
         </div>
      </div>
   );
}
