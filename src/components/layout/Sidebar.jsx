import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Sidebar = () => {
  const [buscar, setBuscar] = useState("");

  const navegar = useNavigate();

  const hacerBusqueda = (e) =>{
    e.preventDefault();
    let mi_busqueda = e.target.search_field.value;
    navegar("/buscar/"+mi_busqueda, {replace: true});
  }
  return (
      <aside className="lateral">
        <div className="search">
          <h3 className="title">Buscador</h3>
          <form onSubmit={hacerBusqueda}>
            <input type="text" name="search_field"/>
            <input type="submit" id="search" value="buscar"/>
          </form>
        </div>
        {/* <div className="add">
          <h3>Añadir peliculas</h3>
          <form>
            <input type="text" placeholder="titulo" />
            <textarea placeholder="descripcion"></textarea>
            <input type="submit" value="guardar" />
          </form>
        </div> */}
      </aside>
  );
};
