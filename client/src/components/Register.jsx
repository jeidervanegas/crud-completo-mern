import { useState } from 'react'
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

export const Register = () => {

    const navigate = useNavigate();

  const [dataUser, setDataUser] = useState({ email: '', password: '', name:'' });

  const handleOnChange = (e) => {
    setDataUser({...dataUser, [e.target.name]: e.target.value})
  }

  const { registerUser } = useUser();

  const register = (e) => {
    e.preventDefault();
    registerUser(dataUser, navigate)
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className="card">
            <div className="container text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-user-plus" width="82" height="82" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#a905b6" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
            <path d="M16 19h6" />
            <path d="M19 16v6" />
            <path d="M6 21v-2a4 4 0 0 1 4 -4h4" />
            </svg>
            </div>
            <div className="card-header text-center mt-3">
                <h4>Registro de jefe</h4>
            </div>
          <div className="card-body">
            <form onSubmit={register}>
              <div className="mb-3">
                <label className="form-label">Correo</label>
                <input 
                    className="form-control" 
                    autoFocus name="email" 
                    type="email" 
                    onChange={handleOnChange}
                />
                
              </div>
              <div className="mb-3">
                <label className="form-label">Contraseña</label>
                <input 
                    className="form-control" 
                    name="password" 
                    type="password" 
                    onChange={handleOnChange}
                />
                
              </div>
              <div className="mb-3">
                <label className="form-label">Nombre</label>
                <input 
                    className="form-control" 
                    name="name" 
                    type="text" 
                    onChange={handleOnChange}
                />
                
              </div>

              <button type='submit' className='form-control btn btn-primary'>Ingresar</button>
            </form>
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}
