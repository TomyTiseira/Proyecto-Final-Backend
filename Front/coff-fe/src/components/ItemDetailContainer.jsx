import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ItemDetail from "./ItemDetail";
import Title from "./Title";

const ItemDetailContainer = () => {
	const [product, setProduct] = useState({});
	const { id } = useParams();

	useEffect(() => {
    fetch(`/api/productos/${id}`)
      .then(response => response.json())
      .then(data => setProduct(data))
  }, [id]);

	// Consultar si con el id ingresado se recaudo la información (en este caso el nombre) para determinar si existe o no el producto.
	if(product.name) {
		return (
			<div id="detalle">
				<Title greeting="Detalle"/>
				<ItemDetail data={product}/>
			</div>
		);
	}
	else {
		return(
			<div className='box-grid text-center bg m-5'>
				<h2 className='fs-5 py-2 col text-white'>No existe el producto.</h2>
				<Link to="/products"><button className='boton-a'>Volver a los productos</button></Link>
			</div>
		);
	}
};

export default ItemDetailContainer;
