import React, {createContext, useEffect, useState} from "react";
import api from "../api"

const Context = createContext();

function AuthProvider({ children }){
    const [token, setToken] = useState('')
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

    const handleLogin = async (user, label) => {
        switch (label) {
            case "CPF":
                try {
                    const {data} = await api.post('/tecnicos/login', user)

                    console.log(data)
        
                    setToken(data.token)
                    if(token){
                        localStorage.setItem("Token", JSON.stringify(token))
                    }
        
                    api.defaults.headers.Authorization = `Bearer ${token}`
                    setAuthenticated(true)
        
                } catch (error) {
                    setStatus(error.response.data.message);
                }
                break;
            case "CNPJ":
                try {
                    const {data} = await api.post('/empresas/login', user)
        
                    setToken(data.token)
                    localStorage.setItem("Token", JSON.stringify(token))
        
                    api.defaults.headers.Authorization = `Bearer ${token}`
                    setAuthenticated(true)
        
                } catch (error) {
                    setStatus(error.response.data.message);
                }
                
                break;
            case "Mátricula":
                try {
                    const {data} = await api.post('/funcionarios/login', user)
        
                    setToken(data.token)
                    localStorage.setItem("Token", JSON.stringify(token))
        
                    api.defaults.headers.Authorization = `Bearer ${token}`
                    setAuthenticated(true)
        
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