import { BrowserRouter, Route, Routes} from "react-router-dom";

import { AuthProvider } from './Context/AuthContext'
import Home from './pages/Home'
import Login from './pages/Login'
import Cadastro from './pages/Cadastro'
import CadastroFunc from "./pages/CadastroFunc";
import Perfil from "./pages/Perfil";
import RecuperarSenha from "./pages/RecuperaSenha";

const Rotas = () => {
    return (

    <AuthProvider>
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/cadastro" element={<Cadastro/>}/>
            <Route path="/cadastro-funcionario" element={<CadastroFunc/>}/>
            <Route path="/perfil" element={<Perfil/>}/>
            <Route path="/recuperar" element={<RecuperarSenha/>}/>\a
        </Routes>
        </BrowserRouter>
    </AuthProvider>
    );
};

export default Rotas;