import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <div className='text-center'>
        <h2 className="text-center text-white mt-5">Error 404! Sitio no encontrado</h2>
        <Link to="/"><button className='boton-a mt-3'>Volver al inicio</button></Link>
    </div>
  );
}

export default Error;