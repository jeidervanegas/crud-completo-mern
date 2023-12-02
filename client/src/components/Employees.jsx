import { useCallback, useEffect, useState } from 'react'
import { useUser } from '../context/UserContext'
import Swal from 'sweetalert2'
import axios from 'axios'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Modalopen } from './Modal'

export const Employees = () => {
  const [employees, setEmployees] = useState([])
  const [modal, setModal] = useState(false)
  const [edit, setEdit] = useState(false)

  const { user } = useUser()

  const handleCreate = () => {
    setEdit(false)
    setModal(true)
  }

  const handleEdit = (item) => {
    setEdit(item)
    setModal(true)
  }

  useEffect(() => {
    getEmployees()
  }, [])

  // Creamos la funcion para obtener los empelados
  const getEmployees = useCallback(async () => {
    try {
      //hacemos la peticion
      const { data } = await axios.get('/employee/listboss/')

      //le pasamos la data a setEmployees
      setEmployees(data.data)
    } catch (error) {
      if (!error.response.data.ok) {
        return Swal.fire({
          icon: 'error',
          title: error.response.data.message,
          showConfirmButton: false,
          timer: 1500
        })
      }
      console.log('Error el el fontend / función getEmployee', error.message)
    }
  }, [user.token])

  // Funcion de eliminar
  const deleteEmployee = async (id) => {
    Swal.fire({
      title: '¿Está serguro?',
      text: 'Esta acción no es reversible!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, Eliminar!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data } = await axios.delete('/employee/delete/' + id)

        getEmployees()

        Swal.fire({
          icon: 'success',
          title: data.message,
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
  }

  // Funcion para buscar
  const handleSearch = async (e) => {
    const { value } = e.target // EL target que es el <input> dentró del evento (e), el target contiene el target
    try {
      //
      if (!value.length) return await getEmployees()
      //
      const { data } = await axios.get(
        `/employee/search?query=${encodeURI(value)}`
      )
      setEmployees(data.data)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div>
      <nav className="navbar py-4">
        <div className="container">
          <div className="col-md-3">
            <button onClick={handleCreate} className="btn btn-primary">
              Registrar empleado
            </button>
          </div>

          <div className="col-md-6 ml-auto">
            <div className="input-goup">
              <input
                className="form-control "
                type="search"
                placeholder="Buscar..."
                aria-label="Search"
                required
                onChange={handleSearch}
              />
            </div>
          </div>
        </div>
      </nav>

      <section className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h4>Empleado de {user.name}</h4>
              </div>

              <div className="table-responsive-lg">
                <table className="table table-striped">
                  <thead className="table-dark ">
                    <tr>
                      <th>#</th>
                      <th>Nombres</th>
                      <th>Apellidos</th>
                      <th>Identificación</th>
                      <th>Tipo de contrato</th>
                      <th>Opciones</th>
                    </tr>
                  </thead>

                  <tbody className="">
                    {employees.map((item, i) => (
                      <tr key={item._id}>
                        <td>{i + 1}</td>
                        <td>{item.names}</td>
                        <td>{item.surnames}</td>
                        <td>{item.id}</td>
                        <td>{item.tcontract}</td>
                        <td>
                          <button
                            // onClick={() => setOpenFirst(true)}
                            onClick={() => deleteEmployee(item._id)}
                            className="btn btn-danger me-1"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="icon icon-tabler icon-tabler-trash-x"
                              width="32"
                              height="32"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="#ffffff"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                              />
                              <path d="M4 7h16" />
                              <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                              <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                              <path d="M10 12l4 4m0 -4l-4 4" />
                            </svg>
                          </button>

                          <button
                            onClick={() => handleEdit(item)}
                            className="btn btn-warning"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="icon icon-tabler icon-tabler-edit"
                              width="32"
                              height="32"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="#ffffff"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                              />
                              <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                              <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
                              <path d="M16 5l3 3" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {modal && (
        <Modalopen
          editing={edit}
          setModal={setModal}
          getEmployees={getEmployees}
        />
      )}
    </div>
  )
}
