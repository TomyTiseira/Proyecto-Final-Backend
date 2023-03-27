import React from 'react';
import carrito from '../image/carrito.jpg';
import { Link } from "react-router-dom";

const CartWidget = () => {
  return (
	<Link to="/cart">
		<img src={carrito} alt="Carrito" width="40" height="40"/>
	</Link>
  );
}

export default CartWidget;