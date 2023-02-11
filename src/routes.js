import { BrowserRouter, Route, Routes} from "react-router-dom";

import { AuthProvider } from './Context/AuthContext'
import Home from './pages/Home'
import Login from './pages/Login'
import Cadastro from './pages/Cadastro'
import CadastroFunc from "./pages/CadastroFunc";
import Perfil from "./pages/Perfil";
import RecuperarSenha from "./pages/RecuperaSenha";
import Detalhes from "./pages/Detalhes";
import ListaFunc from "./pages/ListaFunc";
import MudaSenha from "./pages/MudaSenha";

const Rotas = () => {
    return (

    <AuthProvider>
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/detalhes" element={<Detalhes/>}/>
            <Route path="/cadastro" element={<Cadastro/>}/>
            <Route path="/cadastro-funcionario" element={<CadastroFunc/>}/>
            <Route path="/perfil" element={<Perfil/>}/>
            <Route path="/recuperar" element={<RecuperarSenha/>}/>
            <Route path="/lista-funcionarios" element={<ListaFunc/>}/>
            <Route path="/mudarsenha" element={<MudaSenha/>}/>

        </Routes>
        </BrowserRouter>
    </AuthProvider>
    );
};

export default Rotas;