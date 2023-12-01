

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { Login } from './components/Login'
import { Nav } from './components/Nav'
import { Employees } from './components/Employees'
import { Register } from './components/Register'
import axios from 'axios'
import { useUser } from './context/UserContext'
import { Modalopen } from './components/Modal'

axios.defaults.baseURL = 'http://localhost:5011/api'

function App() {

  const { user } = useUser();

  axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`


  return <BrowserRouter>
      <Nav/>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/employees' element={<Employees/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/modal' element={<Modalopen/>}/>
      </Routes>
    </BrowserRouter>
}

export default App
