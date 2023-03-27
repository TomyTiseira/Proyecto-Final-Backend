import React, { useEffect, useState } from "react";

const ItemCount = ({ initial, stock, onAdd }) => {
	const [count, setCount] = useState(parseInt(initial));

	// Decrementar la cantidad del producto.
	const decrease = () => {
		setCount(count - 1);
	};

	// Incrementar la cantidad del producto.
	const increase = () => {
		setCount(count + 1);
	};

	// Establecer el contador en el valor inicial recibido.
	useEffect(() => {
		setCount(parseInt(initial));
	}, [initial]);

	return (
		<div>
			<button disabled={count <= 1} onClick={decrease} className="button-count">
				-
			</button>
			<span className="p-2">{count}</span>
			<button disabled={count >= stock} onClick={increase} className="button-count">
				+
			</button>
			<div>
				<button className="boton-a" disabled={stock <= 0} onClick={() => onAdd(count)}>
					Agregar al carrito
				</button>
			</div>
		</div>
	);
};

export default ItemCount;