import { Link } from 'react-router-dom'
import './modal.css'

import React, { useState } from 'react'
import Swal from 'sweetalert2';
import axios from 'axios';

export const Modalopen = ({ setModal, getEmployees }) => {

  const [dataployee, setDatatEmployee] = useState({names:'', surnames:'', id:'', tcontract:''});
  
  const typeContracts = ['fijo','indefinido', 'practicante'];


  const close = () => {
    setModal(false)
  }
  const handleOnChange = (e) => {
    setDatatEmployee({...dataployee, [e.target.name]: e.target.value});
  }

  const saveEmployee = async(e) => {
    try {
      e.preventDefault();

      const {data} = await axios.post('/employee/create', dataployee);

      Swal.fire({
        icon: 'success',
        title: data.message,
        showConfirmButton: false,
        timer: 1500
      });
      
      setModal(false);
      getEmployees();
    } catch (error) {
      if (!error.response.data.ok) {
        return Swal.fire({
          icon: 'error',
          title: error.response.data.message,
          showConfirmButton: false,
          timer: 1500
        })
      }
      console.log('Error el el fontend / función register', error.message)
    }

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
          <form onSubmit={saveEmployee}>
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
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Tipo de contrato</label>
              <select  onChange={handleOnChange} name="tcontract" className="form-control">
                <option>Fijo</option>
                <option>Indefinido</option>
                <option>Practicante</option>
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
