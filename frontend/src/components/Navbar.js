import React from "react";
import {useAuth} from '../context/AuthContext'
import { signOut } from "firebase/auth";
import {auth} from '../firebase'

const Navbar = () =>{
    const {usuario} = useAuth()

    return(
        <nav>
            <h1>Pin Web</h1>
            {usuario && <button onClick={()=> signOut(auth)}>Cerrar Sesión</button>}
        </nav>
    )
}

export default Navbar