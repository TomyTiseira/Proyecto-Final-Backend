import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import ItemList from "./ItemList";
import Title from "./Title";

const ItemListContainer = () => {
	const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/productos")
      .then(response => response.json())
      .then(data => setProducts(data))
  }, []);

  return (
    <div id="menu">
			<Title greeting="Menú"/>
      <ItemList data={products}/>
    </div>
  );
};

export default ItemListContainer;
