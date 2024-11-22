import React, {useState} from "react";
import {auth} from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider,FacebookAuthProvider } from "firebase/auth";
import {useAuth} from '../context/AuthContext'

const Auth = () =>{
    const {usuario} = useAuth()
    const [correo, setCorreo] = useState('')
    const [password, setPassword] = useState('')
    const [isLogin, setIsLogin] = useState(true)
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        try {
            if(isLogin){
                await signInWithEmailAndPassword(auth, correo, password)
            } else {
                await createUserWithEmailAndPassword(auth, correo, password)
            }
            setCorreo('')
            setPassword('')
        } catch (error) {
            setError(error.message)
        }
    }
    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider()
        await signInWithPopup(auth, provider).catch((error)=>{
            setError(error.message)
        })
    }

    const handleFacebookLogin = async () => {
        const provider = new FacebookAuthProvider(
            await signInWithPopup(auth,provider).catch((error)=>setError(error.message))
        )
    }

    return(
        <div className="auth-container">
            <form onSubmit={handleSubmit}>
                <input 
                type="email"
                value={correo}
                onChange={(e)=> setCorreo(e.target.value)}
                placeholder="Ingresa tu correo"
                required />
                <input
                type="password"
                value={password} 
                onChange={(e)=> setPassword(e.target.value)}
                placeholder="Ingresa tu contraseña"
                required/>
                <button type="submit">{isLogin? 'Login':'Registro'}</button>
                <button type="button" onClick={()=>setIsLogin(!isLogin)}> {isLogin?'Switch to registrer': 'switch to Login'}</button>
            </form>
            {error && <p className="error">{error}</p>}
        <div>
            <button onClick={handleGoogleLogin}>Iniciar Sesion con Google</button>
            <button onClick={handleFacebookLogin}>Iniciar Sesión con Facebook</button>
        </div>
        </div>
    )
}

export default Auth