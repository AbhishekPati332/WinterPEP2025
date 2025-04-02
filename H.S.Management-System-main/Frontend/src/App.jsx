import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import Footer from './components/Footer'
import Hospitals from './pages/Hospitals'
import FullCard from './components/FullCard'
import MyHospital from './components/MyHospital'
import CreateHospital from './components/CreateHospital'
import PrivateRoute from './components/PrivateRoute'
import AddDetails from './components/AddDetails'
import NotFound from './components/NotFound'
import Layout from './components/Layout'
import UpdateHospital from './components/UpdateHospital'
import FreeRoute from './components/FreeRoute'

function App() {

  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={2000} />
      <Routes>

        <Route path='/' element={<Layout />} >

          <Route path='*' element={<NotFound />} />
          <Route index element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='contact' element={<Contact />} />
          <Route path='/AllHospitals' element={<Hospitals />} />

          <Route path='/myHospitals' element={<PrivateRoute><MyHospital /></PrivateRoute>} />

        </Route>

        <Route path='/hospital/:id' element={<FullCard />} />
        <Route path='/create-hospital' element={<PrivateRoute><CreateHospital /></PrivateRoute>} />
        <Route path='/update/:id' element={<PrivateRoute><AddDetails /></PrivateRoute>} />
        <Route path='/update-hospital/:id' element={<PrivateRoute><UpdateHospital /></PrivateRoute>} />


        <Route path='/signup' element={<FreeRoute><Signup /></FreeRoute>} />
        <Route path='/login' element={<FreeRoute><Login /></FreeRoute>} />


      </Routes>
      <Footer />
    </BrowserRouter>
  )

}

export default App
