import React from 'react'
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom';
import logo from '../assets/images/logo.png'
import AuthButton from './AuthButton';

const Navbar = () => {

    const linkClass = ({ isActive }) =>
        `hover:text-blue-500 transition-all duration-300 relative pb-1 ${isActive ? 'text-blue-500 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-blue-500' : ''
        }`;

    return <div className=' w-[80%] mx-auto mb-[10px] h-[100px] flex-col items-ceter justify-center ' >
        <div className=' flex justify-between items-center w-full h-full pl-[10px] pr-[10px] ' >
            <div className=' flex items-center ' >
                <NavLink to='/' className=' flex items-center ' >
                    <img src={logo} alt="" className=' w-[100px] ' />
                    <p>LPU's Hospital</p>
                </NavLink>
            </div>

            {
                localStorage.getItem("role") === "Hospital_Admin" ? (
                    <div className=' flex justify-between w-[40%] ' >
                        <NavLink to='/myHospitals' className={linkClass} >My Hospitals</NavLink>
                        <NavLink to='/AllHospitals' className={linkClass} >All Hospitals</NavLink>
                        <NavLink to='/create-hospital' className={linkClass} >Create Hospital</NavLink>
                        <NavLink to='/contact' className={linkClass} >Contact</NavLink>
                    </div>
                ) : (
                    <div className=' flex justify-between w-[30%] ' >
                        <NavLink to='/' className={linkClass} >Home</NavLink>
                        <NavLink to='/AllHospitals' className={linkClass} >All Hospitals</NavLink>
                        <NavLink to='/about' className={linkClass} >About</NavLink>
                        <NavLink to='/contact' className={linkClass} >Contact</NavLink>
                    </div>
                )
            }



            <AuthButton />


        </div>

        <div className=' w-full h-[1px] bg-gray-600 ' >
        </div>
    </div>
}

export default Navbar