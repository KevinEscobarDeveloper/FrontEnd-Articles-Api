import React from 'react'
import { useState, useEffect } from 'react';
import { Global } from '../../helpers/Global';
import {useForm} from '../../hooks/useForm';
import { Peticion } from '../../helpers/Peticion';
import { useParams } from 'react-router-dom';

export const Editar = () => {


  const {formulario, enviado, cambiado} = useForm({});
  const [resultado, setResultado] = useState("No enviado");
  const [articulo, setArticulo] = useState({});
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
    
  };

  const editarArticulo = async(e) =>{
    e.preventDefault();
    //recorger datos formulario
    let nuevoArticulo =  formulario;

    

    //editar articulo en el backend
    const {datos} = await Peticion(Global.url+"articulo/"+params.id,"PUT", nuevoArticulo);
   
    if(datos.status === "success"){
      setResultado("Guardado")
    }else{
      setResultado("Error");
    }

    //subir la imagen
    const fileInput = document.querySelector("#file");

    if(datos.status === "success" && fileInput.files[0]){
      setResultado("Guardado");

     

      const formData = new FormData();
      formData.append('file0',fileInput.files[0]);
      console.log(datos)
      const subida = await Peticion(Global.url+"/subir-imagen/"+datos.articulos._id,"POST", formData,true);
      
      if(subida.datos.status === "success"){
        setResultado("Guardado")
      }else{
        setResultado("Error");
      }
    
    }

  }

  return (
    <div className='jumbo'>
      <h1>Editar artículo</h1>
      <p>Formulario para editar: {articulo.titulo}</p>
  
      <strong>{resultado == "Guardado" ? "Articulo guardado con exito" : ""}</strong>
      <strong>{resultado == "Error" ? "Los datos proporcionados son incorrectos" : ""}</strong>

      {/* montar formulario */}
      <form className='formulario' onSubmit={editarArticulo}>
        <div className='form-group'>
          <label htmlFor='titulo'>Titulo</label>
          <input type="text" name='titulo' onChange={cambiado} defaultValue={articulo.titulo}/>
        </div>
        <div className='form-group'>
          <label htmlFor='contenido'>Contenido</label>
          <textarea name='contenido' onChange={cambiado} defaultValue={articulo.contenido}/>
        </div>
        <div className='form-group'>
          <label htmlFor='file0'>Imagen</label>
          <div className="mascara">
            {articulo.image == "default.png" && <img src="" />}
            {articulo.image != "default.png" && (
              <img src={Global.url + "imagen/" + articulo.image} />
            )}
          </div>
          <input type="file" name='file0' id='file'/>
        </div>

        <input type='submit' value='guardar' className='btn btn-success'/>
      </form>

    </div>
  )
}
