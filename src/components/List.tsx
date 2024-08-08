interface Props {
   items: string[];
   heading: string;
}

export default function List({ items, heading }: Props) {
   return (
      <div className="list-container">
         <h3 className="list-heading heading mediumweight">{heading}</h3>
         <ul>
            {items.map((item, index) => (
               <li key={index}>{item}</li>
            ))}
         </ul>
      </div>
   );
}
