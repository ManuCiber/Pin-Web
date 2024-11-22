import React,{ useState } from "react"
import {db} from '../firebase'
import { collection, addDoc } from "firebase/firestore"

const Commentarios = (({imageId}) =>{
    const [comentario, setComentario] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefualt()
        setError('')
        try {
            await addDoc(collection(db,"comentarios"), imageId, comentario)
            setComentario('')
        } catch (error) {
            setError('Error al Agregar Comentario')
        }
    }

    return(
        <div className="comment-container">
            <form onSubmit={handleSubmit}>
                <input
                type="text"
                value={comentario}
                onChange={(e)=> setComentario(e.target.value)}
                placeholder="Escribe un comentario"
                required />
                <button type="submit"Enviar></button>
            </form>
            {error && <p className="error">{error}</p>}
        </div>
    )
})

export default Commentarios