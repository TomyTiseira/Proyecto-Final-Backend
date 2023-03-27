import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [formvalue, setFormvalue] = useState({email: "", password: "", nombre: "", direccion: "", edad: "", numero: "", foto: ""});
  const [resultLogin, setResultLogin] = useState();

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

    const data = await fetch('/signup', requestOptions)
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
        <div class="inputBox">
          <label for="nombre">Nombre</label>
          <input id="nombre" name="nombre" type="text" onChange={handleInput} placeholder="Nombre"/>
        </div>
        <div class="inputBox">
          <label for="direccion">Direccion</label>
          <input id="direccion" name="direccion" type="text" onChange={handleInput} placeholder="Direccion"/>
        </div>
        <div class="inputBox">
          <label for="edad">Edad</label>
          <input id="edad" name="edad" type="number" onChange={handleInput} placeholder="Edad"/>
        </div>
        <div class="inputBox">
          <label for="numero">Numero de Telefono</label>
          <input id="numero" name="numero" type="number" onChange={handleInput} placeholder="Numero"/>
        </div>
        <div class="inputBox">
          <label for="foto">Foto</label>
          <input id="foto" name="foto" type="text" onChange={handleInput} placeholder="Foto"/>
        </div>
        <input className="boton-a" type="submit" value="Registrate"/>
      </form>
    );
  } else {
    if (resultLogin === "error") {
      return (
        <div className="text-center">
          <h2 className='fs-5 py-2 col text-white text-center'>Error 403! La cuenta no se pudo crear</h2>
          <Link to="/"><button className='boton-a'>Volver al inicio</button></Link>
        </div>
      );
    };

    return (
      <div className="text-center">
        <h2 className='fs-5 py-2 col text-white'>Cuenta creada con exito</h2>
        <Link to="/login"><button className='boton-a'>Ir a login</button></Link>
      </div>
    );
  }
}

export default Signup;