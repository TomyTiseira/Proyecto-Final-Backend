import React from "react";
import Item from "./Item";

const ItemList = ({data = []}) => {
	
	// Cards de los productos.
	const cardsProductos = data.map(film => {
		return(
		<div key={film._id} className='box-grid text-center bg'>
			<Item info={film}/>
		</div>);
	});

	return (
		<div className="grid-container">
			{cardsProductos}
		</div>
	);
};

export default ItemList;
