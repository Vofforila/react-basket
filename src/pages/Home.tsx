import "../style/home.css";

import Introduction from "../components/Introduction";
import About from "../components/About";

export default function Home() {
   return (
      <div className="home-container">
         <Introduction></Introduction>
         <About></About>
      </div>
   );
}
