import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

import React, { useEffect, useState } from "react";

import Product from "../components/Product";

import { useUser } from "../contexts/UserContext";

import "../style/market.css";

export default function Market() {
   const { user } = useUser();
   const [types, setTypes] = useState<string[]>([]);
   const [products, setProducts] = useState<any[]>([]);
   const [selectedType, setSelectedType] = useState<string>("");
   const [initialLoad, setInitialLoad] = useState<boolean>(true);

   async function handleTypeChange(e: React.ChangeEvent<HTMLSelectElement>) {
      console.log("Exec 1");
      const selectedType = e.target.value;
      setSelectedType(selectedType.toLowerCase());
      fetchProducts(selectedType.toLowerCase());
   }

   async function fetchProducts(type: string) {
      try {
         console.log("Exec 2");
         const querySnapshot = await getDocs(
            collection(db, type.toLowerCase())
         );
         const productsArray: any[] = [];
         querySnapshot.forEach((doc) => {
            productsArray.push(doc.data());
         });
         setProducts(productsArray);
      } catch (error) {
         console.error("Error fetching products: ", error);
      }
   }

   useEffect(() => {
      console.log("i fire once");
      let firstrun = false;
      const fetchTypes = async () => {
         try {
            const querySnapshot = await getDocs(collection(db, "typeList"));
            const typesArray: string[] = [];

            querySnapshot.forEach((doc) => {
               const data = doc.data();
               if (data && data.name) {
                  const filterName = data.name;
                  typesArray.push(
                     filterName[0].toUpperCase() + filterName.substring(1)
                  );
               }
            });

            setTypes(typesArray);

            if (typesArray.length > 0 && initialLoad) {
               const initialType = typesArray[0];
               setSelectedType(initialType);
               fetchProducts(initialType);
               setInitialLoad(false);
            }
         } catch (error) {
            console.error("Error fetching types: ", error);
         }
      };

      fetchTypes();
   }, [initialLoad]);

   return (
      <div className="product-container">
         <div className="product-navbar">
            <select
               className="product-dropdown"
               name="products"
               title="products"
               onChange={handleTypeChange}
            >
               {types.map((type, index) => (
                  <option key={index} value={type}>
                     {type}
                  </option>
               ))}
            </select>
            <div className="filtered-number">
               <p className="medium smallweight">Found:</p>
            </div>
            <div className="sale">
               <p className="medium smallweight">Sale</p>
               <input type="checkbox" id="sale-filter" title="sale" />
            </div>
         </div>
         <div className="product-list-container">
            {products.map((product, index) => (
               <Product
                  key={index}
                  name={product.name}
                  price={product.price}
                  sale={product.sale}
               />
            ))}
         </div>
      </div>
   );
}
