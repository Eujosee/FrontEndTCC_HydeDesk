import React, {createContext, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import api from "../api"

const Context = createContext();

function AuthProvider({ children }){
    const [token, setToken] = useState('')
    const [id, setID] = useState('')
    const [tipo, setTipo] = useState('')
    const [status, setStatus] = useState('')
    const [authenticated, setAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true)
    useEffect(() =>{
        const activeToken = localStorage.getItem("Token")
        
        if(activeToken){
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(activeToken)}`
            setAuthenticated(true)
        }

        setLoading(false)
    },[])
    // const navigate = useNavigate()
    const handleLogin = async (user, label) => {
      
        switch (label) {
            case "cpf":
                try {
                    const {data} = await api.post('/tecnicos/login', user)
        
                    setToken(data.token)
                    setID(data.id)
                    setTipo(data.tipo)
                    

                    if(token && id && tipo){
                        localStorage.setItem("Token", JSON.stringify(token))
                        localStorage.setItem("Id", JSON.stringify(id))
                        localStorage.setItem("Tipo", JSON.stringify(tipo))
                        api.defaults.headers.Authorization = `Bearer ${token}`
                        // navigate("/")
                    }
                    setAuthenticated(true)
        
        
                } catch (error) {
                    console.log(error)
                    setStatus(error.response.data.message);
                }
                break;
            case "cnpj":
                try {
                    const {data} = await api.post('/empresas/login', user)
                    
                    setToken(data.token)
                    setID(data.id)
                    setTipo(data.tipo)

                    if(token && id && tipo){
                        localStorage.setItem("Token", JSON.stringify(token))
                        localStorage.setItem("Id", JSON.stringify(id))
                        localStorage.setItem("Tipo", JSON.stringify(tipo))
                        api.defaults.headers.Authorization = `Bearer ${token}`                    
                    }
                    setAuthenticated(true)
                    
                } catch (error) {
                    setStatus(error.response.data.message);
                }
                
                break;
            case "Mátricula":
                try {
                    const {data} = await api.post('/funcionarios/login', user)
                    
                    setToken(data.token)
                    setID(data.id)
                    setTipo(data.tipo)

                    if(token && id && tipo){
                        localStorage.setItem("Token", JSON.stringify(token))
                        localStorage.setItem("Id", JSON.stringify(id))
                        localStorage.setItem("Tipo", JSON.stringify(tipo))
                        api.defaults.headers.Authorization = `Bearer ${token}`
                        setAuthenticated(true)
                        
                    }
                    
        
                } catch (error) {
                    setStatus(error.response.data.message);
                }
                break;
        
            default:
                setStatus("Selecione uma opção!")
                break;
        }
    }

    function handleLogout (){
        setAuthenticated(false)
        localStorage.removeItem("Token")
        localStorage.removeItem("Id")
        localStorage.removeItem("Tipo")
        api.defaults.headers.Authorization = undefined
    }

    if(loading){
        return <h1>Carregando</h1>
    }

    return(
        <Context.Provider value={{authenticated, handleLogin, handleLogout, status}}>
            {children}
        </Context.Provider>
    );
}

export { Context, AuthProvider }