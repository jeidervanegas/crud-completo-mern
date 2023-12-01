import axios from 'axios';
import Swal from 'sweetalert2';
import  { useContext, useEffect } from 'react';
import { createContext } from 'react';
import { useState } from 'react';


//creamos el contexto
const UserContext = createContext();

//creamos el estado inicial
const initialState = {login:false, token:'', name:''};

//creamos la funcion del proveedor
export const UserProvider = (props) => {
    //creamos el estado del user
    const [user, setUser] = useState(initialState);

    //mantenemos la sessión iniciada
    useEffect(() => {
        const initial = JSON.parse(localStorage.getItem('user'));
        initial ? initial.login && setUser(initial) :setUser(initialState)
    }, [])

    //creamos la función de login
    const loginUser = async(dataUser, navigate) => {
        try {
            //hacemos la peticion al backend
            const { data } = await axios.post('http://localhost:5011/api/login', dataUser);

            // console.log(resp.data);

            //validamos si el login se hizo correctamente
            if(data.ok) {
                //creamos un nuevo objeto para cambiar el estado inicial
                const userLogin = {
                    login: true,
                    token: data.data.token,
                    name: data.data.name,
                }

                //guardamos el objeto en el localStorage
                localStorage.setItem('user', JSON.stringify(userLogin));

                //cambiamos el estado del user con los valores del userLogin
                setUser(userLogin);

                //navigate
                navigate('/employees')

                //capturamos el mensaje de bienvenida
                Swal.fire({
                    icon: 'success',
                    title: data.message,
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        } catch (error) {
            if(!error.response.data.ok) {
                return                 Swal.fire({
                    icon: 'error',
                    title: error.response.data.message,
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
            console.log('Error el el fontend / función login', error.message);
        }
    }
    const registerUser = async(dataUser, navigate) => {
        try {
            //hacemos la peticion al backend
            const { data } = await axios.post('http://localhost:5011/api/register', dataUser);

            // console.log(resp.data);

            //validamos si el login se hizo correctamente
            if(data.ok) {
                //creamos un nuevo objeto para cambiar el estado inicial
                const userLogin = {
                    login: true,
                    token: data.data.token,
                    name: data.data.name,
                }

                //guardamos el objeto en el localStorage
                localStorage.setItem('user', JSON.stringify(userLogin));

                //cambiamos el estado del user con los valores del userLogin
                setUser(userLogin);

                //navigate
                navigate('/employees')

                //capturamos el mensaje de bienvenida
                Swal.fire({
                    icon: 'success',
                    title: data.message,
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        } catch (error) {
            if(!error.response.data.ok) {
                return                 Swal.fire({
                    icon: 'error',
                    title: error.response.data.message,
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
            console.log('Error el el fontend / función register', error.message);
        }
    }

    //funcion de cerrar sesión
    const exit = () => {
        setUser(initialState)
        localStorage.removeItem('user');
    }
    //exportamos
    const value = {
        loginUser,
        user,
        exit,
        registerUser,
    }

    return <UserContext.Provider value={value} {...props}/>
}

export function useUser() {
    const context = useContext(UserContext);
    if(!context) {
        throw new Error('useUser error');
    }
    return context;
}