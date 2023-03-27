import NavBar from "./components/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import CartProvider from "./context/CartContext";
import ItemListContainer from "./components/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer";
import Error from "./components/Error";
import Home from "./components/Home";
import LoginProvider from "./context/LoginContext";
import Signup from "./components/Signup";
import Login from "./components/Login";

function App() {
	return (
		<BrowserRouter>
			{/* <CartProvider> */}
			<LoginProvider>
				<NavBar />
					<Routes>
						<Route exact path="/" element={<Home/>}/>
						<Route exact path="/products" element={<ItemListContainer/>}/>
						<Route exact path="/products/:id" element={<ItemDetailContainer/>}/>
						<Route exact path="/signup" element={<Signup/>}/>
						<Route exact path="/login" element={<Login/>}/>
						<Route path="*" element={<Error/>}/>
					</Routes>
			</LoginProvider>
			{/* </CartProvider> */}
		</BrowserRouter>
	);
}

export default App;