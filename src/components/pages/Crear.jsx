import React from 'react'
import { useState } from 'react';
import { Global } from '../../helpers/Global';
import {useForm} from '../../hooks/useForm';
import { Peticion } from '../../helpers/Peticion';

export const Crear = () => {

  const {formulario, enviado, cambiado} = useForm({});
  const [resultado, setResultado] = useState("No enviado");

  const guardarArticulo = async(e) =>{
    e.preventDefault();
    //recorger datos formulario
    let nuevoArticulo =  formulario;

    

    //guardar articulos en el backend
    const {datos,cargando} = await Peticion(Global.url+"create","POST", nuevoArticulo);

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
      const subida = await Peticion(Global.url+"/subir-imagen/"+datos.article._id,"POST", formData,true);
      
      if(subida.datos.status === "success"){
        setResultado("Guardado")
      }else{
        setResultado("Error");
      }
    
    }

  }

  return (
    <div className='jumbo'>
      <h1>Crear artículo</h1>
      <p>Formulario para crear un artículo</p>
  
      <strong>{resultado == "Guardado" ? "Articulo guardado con exito" : ""}</strong>
      <strong>{resultado == "Error" ? "Los datos proporcionados son incorrectos" : ""}</strong>

      {/* montar formulario */}
      <form className='formulario' onSubmit={guardarArticulo}>
        <div className='form-group'>
          <label htmlFor='titulo'>Titulo</label>
          <input type="text" name='titulo' onChange={cambiado}/>
        </div>
        <div className='form-group'>
          <label htmlFor='contenido'>Contenido</label>
          <textarea name='contenido' onChange={cambiado}/>
        </div>
        <div className='form-group'>
          <label htmlFor='file0'>Imagen</label>
          <input type="file" name='file0' id='file'/>
        </div>

        <input type='submit' value='guardar' className='btn btn-success'/>
      </form>

    </div>
  )
}
