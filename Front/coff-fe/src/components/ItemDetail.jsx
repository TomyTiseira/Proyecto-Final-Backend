import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLoginContext } from "../context/LoginContext";
import ItemCount from "./ItemCount";

export const ItemDetail = ({ data }) => {
	const { loginEmail } = useLoginContext();
	const [goToCart, setGoToCart] = useState(false);

	// Añadir producto y setear el goToCart para que no vaya instantaneamente al carrito sino que muestre un mensaje antes.
	const onAdd = async (quantity) => {
		console.log(quantity)
		setGoToCart(true);

		const user = await fetch("/api/carrito")
			.then(response => response.json())
			.then(data => data)

		if(user.result === "error") {
			loginEmail(null);
			setGoToCart("error");
		} else {

			const requestOptions = {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({quantity})
			};
	
			await fetch(`/api/carrito/${user.cartId}/productos/${data._id}`, requestOptions)
				.then((response) => response.json())
				.then((data) => data)
				.catch((e) => console.error(e.message));
	
				setGoToCart(true);
		}
	};

	if(goToCart === "error") {
		return(
			<div className="text-center">
				<h2 className='fs-5 py-2 col text-white text-center'>Error 403! Iniciar sesión para continuar</h2>
				<Link to="/login"><button className='boton-a'>Login</button></Link>
			</div>
		);
	}

	return (
		<div className="box-grid text-center bg">
			<img src={data.photo} alt={data.name} />
			<h3 className="fs-5 py-2 col">{data.name}</h3>
			<div className="fs-6">Descripción: <span>{data.description}</span></div>
			{goToCart ? (
				<Link to="/cart" className="text-white fs-4">Ir al carrito</Link>
			) : (
				<ItemCount initial={1} stock={data.stock} onAdd={onAdd}/>
			)}
		</div>
	);
};

export default ItemDetail;
