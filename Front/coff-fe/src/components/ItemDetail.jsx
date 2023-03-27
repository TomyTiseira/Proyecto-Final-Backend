import React, { useState } from "react";
import { Link } from "react-router-dom";
// import { useCartContext } from "../context/CartContext";
import ItemCount from "./ItemCount";

export const ItemDetail = ({ data }) => {
	const [goToCart, setGoToCart] = useState(false);
	// const { addProduct } = useCartContext();

	// Añadir producto y setear el goToCart para que no vaya instantaneamente al carrito sino que muestre un mensaje antes.
	const onAdd = (quantity) => {
		setGoToCart(true);
		// addProduct(data, quantity);
	};

	return (
		<div className="box-grid text-center bg">
			<img src={data.photo} alt={data.name} />
			<h3 className="fs-5 py-2 col">{data.name}</h3>
			<div className="fs-6">Descripción: <span>{data.description}</span></div>
			{goToCart ? (
				<Link to="/cart" className="text-white fs-4">Ir al carrito</Link>
			) : (
				<ItemCount initial={1} stock={5} onAdd={onAdd}/>
			)}
		</div>
	);
};

export default ItemDetail;
