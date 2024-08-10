import "../style/auth.css";

export default function Login() {
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
                     title="login-email"
                     placeholder="Enter email..."
                  />
               </div>
            </div>
            <div className="auth-item">
               <p className="password-header big">Password</p>
               <div className="password-input">
                  <input
                     className="login-password"
                     type="input"
                     title="login-password"
                     placeholder="Enter password..."
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
