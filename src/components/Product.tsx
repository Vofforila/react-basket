import square from "../default/square.png";

interface Props {
   name: string;
   price: number;
   sale: string;
}

export default function Product({ name, price, sale }: Props) {
   return (
      <div className="product">
         <div className="product-name">
            <p className="big mediumweight">{name}</p>
         </div>
         <div className="product-image-container">
            <img className="product-image" src={square} alt="error" />
            <div className="product-image-sale">
               <p>Super Pret</p>
            </div>
         </div>
         <div className="product-price">
            <div className="product-price-container">
               <p className="big product-price-text">{price} + " " + $ </p>
               <p className="big product-price-text">
                  <del>40.00 $</del>
               </p>
            </div>
            <button type="button" className="button add-product-button">
               Add to Cart
            </button>
         </div>
      </div>
   );
}
