import "../style/home.css";

export default function Introduction() {
   return (
      <div className="introduction-container">
         <p className="title bigweight introduction-title">React Basket</p>
         <div className="introduction-list-container">
            <h3 className="introduction-list-heading heading mediumweight">
               Goals:
            </h3>
            <ul className="introduction-list">
               <li>Components</li>
               <li>State</li>
               <li>Redux</li>
               <li>Routing</li>
               <li>Hooks</li>
               <li>Database</li>
               <li>Auth</li>
            </ul>
         </div>
      </div>
   );
}
