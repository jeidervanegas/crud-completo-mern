import { Link } from 'react-router-dom'
import './modal.css'

import React, { useState } from 'react'
import Swal from 'sweetalert2';
import axios from 'axios';

/**
 * Esta función evita repetir código, ejecuta la lógica principal adentro
 * @param {string} url Es para donde va a ir la petición
 * @param {'post' | 'put'} method El tipo de petición (minusculas POR FAVOR)
 * @param {{names:string, surnames:string, id:string, tcontract:string}} dataployee datos del empleado
 * @param {function} onSuccess Función que se ejecuta al ir todo bién
 */
async function fetcher (url, method, dataployee, onSuccess) {
  try {
    const { data } = await axios[method](url, dataployee); // POST -> axios.post(url, datos) | PUT -> axios.put(url, datos)

    Swal.fire({
      icon: 'success',
      title: data.message,
      showConfirmButton: false,
      timer: 1500
    });
    
    onSuccess();
  } catch (error) {
    if (!error.response?.data.ok) {
      return Swal.fire({
        icon: 'error',
        title: error.response.data.message,
        showConfirmButton: false,
        timer: 1500
      })
    }
    // console.log('Error el el frontend / función register', error.message)
  }
}

const initialState = {names:'', surnames:'', id:'', tcontract: 'Fijo' }

export const Modalopen = ({ editing, setModal, getEmployees }) => {
  const [dataployee, setDatatEmployee] = useState(editing || initialState);
  
  // Cierra la modal
  const close = () => {
    setModal(false)
  }

  // Función para guardar los datos en el estado local
  const handleOnChange = (e) => {
    setDatatEmployee({...dataployee, [e.target.name]: e.target.value});
  }

  // (Especial: Función que se ejecuta dentro de otra función)
  // La función se ejecuta cuando el fecher() ejecuta la función onSuccess, que es
  // Cuando todo va bien...
  const handleSuccess = () => {
    setModal(false);
    getEmployees();
  }

  // Función para registrar/guardar el nuevo empleado
  // Está ejecuta la función externa fecher()
  // No estamos llamando la función handleSuccess(), solo le estamos pasando
  // la referencia a la función para ejecutarla después dentro del fetcher()
  const handleSave = () => {
    fetcher('/employee/create', 'post', dataployee, handleSuccess)
  }

  // Función para editar/actualizar el empleado
  // Está ejecuta la función externa fecher()
  // No estamos llamando la función handleSuccess(), solo le estamos pasando
  // la referencia a la función para ejecutarla después dentro del fetcher()
  const handleEdit = (e) => {
    fetcher(`/employee/update/${dataployee._id}`, 'put', dataployee, handleSuccess)
  }

  // Función gestionar que función debe hacer/ejecutar entre editar o agregar
  // Está ejecuta la función interna handleSave() y handleEdit()
  // Tambien usa el editing: es un POSIBLE objecto con los datos del empleado
  // Objecto o false xd
  const handleSubmit = e => {
    e.preventDefault()

    // Este código es un Switch basicamente, hacemos un return para que no continue con el código
    // Pero fijate, no estamos obteniendo un dato al retunar.
    if (editing) return handleEdit(e)
    handleSave(e)
  }

  return (
    <div className="modalUno">
      <Link className="boton" onClick={close}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-x"
          width="52"
          height="52"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="#ffffff"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M18 6l-12 12" />
          <path d="M6 6l12 12" />
        </svg>
      </Link>
      <div className="card flex">
        <div className="card-header">
          <h5>Aderir empleado</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label" >
                Nombres
              </label>
              <input
                name="names"
                className="form-control"
                autoFocus
                required
                type="text"
                onChange={handleOnChange}
                value={dataployee.names} 
              />
            </div>
            <div className="mb-3">
              <label className="form-label" >
                Apellidos
              </label>
              <input
                name="surnames"
                className="form-control"
                required
                type="text"
                onChange={handleOnChange}
                value={dataployee.surnames}
              />
            </div>
            <div className="mb-3">
              <label className="form-label" >
                Identificación
              </label>
              <input 
                name="id" 
                className="form-control" 
                required 
                type="text" 
                onChange={handleOnChange}
                value={dataployee.id}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Tipo de contrato</label>
              <select  onChange={handleOnChange} name="tcontract" className="form-control">
                <option selected={dataployee.tcontract === 'Fijo'}>Fijo</option>
                <option selected={dataployee.tcontract === 'Indefinido'}>Indefinido</option>
                <option selected={dataployee.tcontract === 'Practicante'}>Practicante</option>
              </select>
            </div>
            <div className="mb-3">
              <button type="submit" className="btn btn-primary form-control">
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
