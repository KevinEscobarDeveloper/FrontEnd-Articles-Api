import React from 'react'
import { Link } from 'react-router-dom';
import { Global } from '../../helpers/Global';
import { Peticion } from '../../helpers/Peticion';

export const Listado = ({articulos, setArticulos}) => {
  const eliminar = async(id) =>{
    let datos = await Peticion( Global.url+'articulo/'+id,'DELETE');
    if(datos.datos.status === "success"){
      let articulosActualizados = articulos.filter(articulo => articulo._id !== id);
      setArticulos(articulosActualizados);
    }
  }
  return (
    articulos.map((articulo) => {
        return (
          <article key={articulo._id} className="articulo-item">
            <div className="mascara">
              { articulo.image =="default.png"  && <img src="" />}
              { articulo.image !="default.png" && <img src={Global.url+"imagen/"+ articulo.image} />}
            </div>
            <div className="datos">
              <h3 className="title"><Link to ={"/articulo/"+articulo._id}>{articulo.titulo} </Link></h3>
              <p className="description">{articulo.contenido}</p>

              <Link to={'/editar/'+articulo._id} className="edit">Editar</Link>
              <button className="delete" onClick={() =>{
                eliminar(articulo._id)
              }}>Borrar</button>
            </div>
          </article>
        );
      })
  )
}
