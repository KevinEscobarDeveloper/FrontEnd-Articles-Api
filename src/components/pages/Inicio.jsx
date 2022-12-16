import React from 'react'
import { Link } from 'react-router-dom'

export const Inicio = () => {
  return (
    <div className='jumbo'>
      <h1>Bienvenido al blog con react</h1>
      <p>Blog desarrollado con el MERN Stack (Mongo, Express, React, NodeJs)</p>
      <Link to="/articulos" className='button'>Ver los Articulos</Link>
    </div>
  )
}
