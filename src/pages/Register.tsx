import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { auth, db } from "../firebase/firebase";
import { collection, addDoc, doc, getDocs, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function Register() {
   const navigate = useNavigate();

   const [username, setUsername] = useState("");
   const [email, setEmail] = useState("");
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

      return "";
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
         if (e.target.value != confirmPassword && confirmPassword != "") {
            setConfirmPasswordError("passwords don't mach");
            return;
         } else if (e.target.value == confirmPassword) {
            setConfirmPasswordError("");
            return;
         }
         return;
      }
      if (e.target.name === "confirmPassword") {
         setConfirmPassword(e.target.value);
         if (password != e.target.value) {
            setConfirmPasswordError("passwords don't mach");
            return;
         } else if (password == e.target.value) {
            setConfirmPasswordError("");
            return;
         }
      }

      let check = false;
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc: any) => {
         const data = doc.data();

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

         console.log(username);
         if (check === false && e.target.name == "username") {
            setUsername(e.target.value);
            setUsernameError("");
         } else if (check === false && e.target.name == "email") {
            setEmail(e.target.value);
            setEmailError("");
         }
      });
   }

   function RegisterUser() {
      if (username == "") {
         setUsernameError("Username not entered");
      } else if (email == "") {
         setEmailError("Email not entered");
      } else if (password == "") {
         setPassowrdError("Password not entered");
      } else if (confirmPassword == "") {
         setConfirmPasswordError("Confirm Password not entered");
      }
      if (
         usernameError === "" &&
         emailError === "" &&
         passowrdError === "" &&
         confirmPasswordError === ""
      ) {
         createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
               console.log("Created account");
               const user = userCredential.user;
               CreateUserDatabase();
               alert("Login succesfully");
               navigate("/login");
            })
            .catch((error) => {
               const errorCode = error.code;
               const errorMessage = error.message;
            });
         return;
      }
   }

   async function CreateUserDatabase() {
      await addDoc(collection(db, "users"), {
         username: username,
         email: email,
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
                     title="Username Input"
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
                     title="Email Input"
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
                     title="Password"
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
                     title="Confirm Password"
                     placeholder="Confirm password..."
                     name="confirmPassword"
                     onChange={CheckCredentials}
                  />
               </div>
            </div>
            <div>
               <button
                  type="button"
                  className="login-button button"
                  onClick={RegisterUser}
               >
                  Register
               </button>
            </div>
         </div>
      </div>
   );
}
