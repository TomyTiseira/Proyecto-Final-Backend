import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLoginContext } from '../context/LoginContext';

const Login = () => {
  const [formvalue, setFormvalue] = useState({email: "", password: ""});
  const [resultLogin, setResultLogin] = useState();
  const { loginEmail } = useLoginContext();

  const handleInput = (e) => {
    const {name, value} = e.target;
    setFormvalue({...formvalue, [name]:value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formvalue)
    };

    const data = await fetch('/login', requestOptions)
      .then((response) => response.json())
      .then((data) => data)
      .catch((e) => console.error(e.message));

    setResultLogin(data.result);
  }

  if (!resultLogin) {
    return (
      <form className="form-container" onSubmit={handleSubmit}>
        <div class="inputBox">
          <label for="email">Email</label>
          <input id="email" name="email" type="text" onChange={handleInput} placeholder="Email"/>
        </div>
        <div class="inputBox">
          <label for="password">Password</label>
          <input id="password" name="password" type="password" onChange={handleInput} placeholder="Pasword"/>
        </div>
        <input className="boton-a" type="submit" value="Iniciar sesión"/>
      </form>
	  );
  } else {
    if (resultLogin !== "success") {
      return (
        <div className="text-center">
          <h2 className='fs-5 py-2 col text-white text-center'>Error 403! Datos inválidos</h2>
          <Link to="/signup"><button className='boton-a'>Registrate</button></Link>
        </div>
      );
    };

    loginEmail(formvalue.email)

    return (
      <div className="text-center">
        <h2 className='fs-5 py-2 col text-white'>Inicio de sesión exitoso</h2>
        <Link to="/products"><button className='boton-a'>Ir a productos</button></Link>
      </div>
    );
  }
};

export default Login;
