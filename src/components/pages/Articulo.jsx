import React from "react";
import { useState, useEffect } from "react";
import { Global } from "../../helpers/Global";
import { useParams } from "react-router-dom";
import { Peticion } from "../../helpers/Peticion";
import { Listado } from "./Listado";

export const Articulo = () => {
  const [articulo, setArticulo] = useState({});
  const [cargando, setCargando] = useState(true);
  const params = useParams();

  useEffect(() => {
    conseguirArticulo();
  }, []);

  const conseguirArticulo = async () => {
    const { datos, cargando } = await Peticion(
      Global.url + "articulo/" + params.id,
      "GET"
    );

    // let peticion = await fetch(url, {
    //   method: "GET",
    // });

    // let datos = await peticion.json();

    if (datos.status == "success") {
      setArticulo(datos.article);
    }
    setCargando(false);
  };

  return (
    <div className="jumbo">
      {cargando ? (
        "cargando..."
      ) : (
        <>
          <h1>{articulo.titulo}</h1>
         
          <p>{articulo.contenido}</p>
          <div className="mascara">
            {articulo.image == "default.png" && <img src="" />}
            {articulo.image != "default.png" && (
              <img src={Global.url + "imagen/" + articulo.image} />
            )}
             <span>{articulo.date}</span>
          </div>
        </>
      )}
    </div>
  );
};
