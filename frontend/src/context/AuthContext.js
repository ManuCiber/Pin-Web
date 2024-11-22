import React, {createContext, useContext, useState, useEffect} from "react";
import {auth} from '../firebase'
import { onAuthStateChanged } from "firebase/auth";

const Auth_Context = createContext()

export const Auth_Provider = ({children}) => {
    const [usuario, setUsuario] = useState(null)

    useEffect(() => {
        const unsuscribe = onAuthStateChanged(auth, (usuario) =>{setUsuario(usuario)})
        return () => unsuscribe()
    }, [])

    return(
        <Auth_Context.Provider value={{usuario}}>
            {children}
        </Auth_Context.Provider>
    )
}

export const useAuth = () => {
    return useContext(Auth_Context)
}