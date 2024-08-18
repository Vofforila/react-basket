import { collection, doc, setDoc, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

import { useState } from "react";

import "../style/dev.css";

export default function Admin() {
   const [name, setName] = useState("");
   const [type, setType] = useState("");
   const [price, setPrice] = useState(0);
   const [sale, setSale] = useState(0);

   class Product {
      name: string;
      price: number;
      sale: number;

      constructor(name: string, price: number, sale: number) {
         this.name = name;
         this.price = price;
         this.sale = sale;
      }
   }

   const productConverter = {
      toFirestore: (product: Product) => {
         return {
            name: product.name,
            price: product.price,
            sale: product.sale,
         };
      },
      fromFirestore: (snapshot: any, options: any) => {
         const data = snapshot.data(options);
         return new Product(data.name, data.price, data.sale);
      },
   };

   async function AddProduct() {
      const newProduct = new Product(name, price, sale);

      const productRef = collection(db, type).withConverter(productConverter);

      await addDoc(productRef, newProduct);

      await setDoc(doc(db, "typeList", type), {
         name: type,
      });
   }

   return (
      <div className="dev-page">
         <p className="title bigweight product-title">Add Product</p>
         <div className="dev-container">
            <input
               id="product-name"
               type="input"
               title="product-name"
               placeholder="Enter name..."
               onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setName(e.target.value);
               }}
            />
            <input
               id="product-type"
               type="input"
               title="product-type"
               placeholder="Enter type..."
               onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setType(e.target.value);
               }}
            />
            <input
               id="product-price"
               type="input"
               title="product-price"
               placeholder="Enter price..."
               onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setPrice(parseFloat(e.target.value));
               }}
            />
            <input
               id="product-sale-price"
               type="input"
               title="product-sale-price"
               placeholder="Enter saleprice..."
               onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setSale(parseFloat(e.target.value));
               }}
            />
            <input id="product-image" type="file" title="product-image" />
         </div>
         <button
            type="button"
            className="product-button button"
            onClick={AddProduct}
         >
            Add
         </button>
      </div>
   );
}
