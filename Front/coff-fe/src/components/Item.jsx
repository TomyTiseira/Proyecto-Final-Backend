import React from "react";
import { Link } from "react-router-dom";

const Item = ({ info }) => {
	return (
		<Link to={`/products/${info._id}`} className="text-white text-decoration-none">
			<img src={info.photo} alt={info.name}/>
			<h3 className="fs-5 py-2 col">{info.name}</h3>
		</Link>
	);
};

export default Item;
