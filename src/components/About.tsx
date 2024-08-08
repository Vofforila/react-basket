export default function About() {
   return (
      <div className="about-container">
         <p className="heading mediumweight about-heading">About</p>
         <div className="about-text-wraper">
            <p className="mediumweight medium about-text-heading">
               This application lets you login as a User or Admin
            </p>
            <ul>
               <li>
                  Admin - Can create new products and add them to the
                  database/market
               </li>
               <li>
                  User - Can shop the market and add products to his basket
               </li>
            </ul>
         </div>
      </div>
   );
}
