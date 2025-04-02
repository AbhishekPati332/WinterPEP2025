import React from 'react'
import Flasy from './Flasy';

const PrivateRoute = ({children}) => {
    const user = localStorage.getItem('role');
    if(user === "Hospital_Admin"){
        return children
    }
    return <Flasy />
}

export default PrivateRoute