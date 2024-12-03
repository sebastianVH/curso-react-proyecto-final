import { useState,useEffect} from 'react'
import { BrowserRouter, Routes, Route, useNavigate, useLocation} from "react-router-dom";
import Login from './components/User/Login';
import './App.css'
import axios from 'axios'
import ListadoPost from './components/Post/ListadoPost';
import VerPost from './components/Post/VerPost';
import WithAuth from './utils/verifyAccess';
import Navbar from './components/NavBar/Navbar';
import { Box } from '@mui/material';
import CrearPost from './components/Post/CrearPost';


axios.defaults.baseURL = 'http://localhost:8080'

function App() {

  const {pathname} = useLocation()
  
  return (
        <>
          { pathname !== '/' && <Navbar/>}
          <Box sx={{ display: 'flex', justifyContent: 'center' , alignContent: 'center' ,minHeight: '80%'}}>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/posts' element={<ListadoPost/>}/>
          <Route path='/posts/:id' element={<h1> Estoy en un post especifico</h1>}/>
          <Route path='/post/crear' element={WithAuth(CrearPost)}/>
          <Route path='/post/editar/:id' element={WithAuth(CrearPost)}/>
          <Route path='*' element={<h1> Ops! Ha ocurrido un error al cargar la pagina</h1>}/>
        </Routes>
        </Box>
        </>
      
  )
}

export default App
