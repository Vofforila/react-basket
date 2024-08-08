import CustomLink from "./CustomLink";

export default function Navbar() {
   return (
      <div className="navbar">
         <div className="navbar-top-left">
            <p className="logo-text big">©</p>
            <p className="logo-text big">Paul Berciu</p>
         </div>
         <div className="navbar-top-right">
            <CustomLink to="/login">Login</CustomLink>
            <CustomLink to="/register">Register</CustomLink>
         </div>
      </div>
   );
}
