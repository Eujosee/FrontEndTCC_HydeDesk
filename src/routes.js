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
import ListaChamados from "./pages/ListaChamados";
import ListaChamadosFunc from "./pages/ListaChamadosFunc";
import MudaSenha from "./pages/MudaSenha";
import AbrirChamado from "./pages/AbrirChamado";


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
            <Route path="/lista-chamados-empresa" element={<ListaChamados/>}/>
            <Route path="/lista-chamados-funcionarios" element={<ListaChamadosFunc/>}/>
            <Route path="/mudar-senha" element={<MudaSenha/>}/>
            <Route path="/abrir-chamado" element={<AbrirChamado/>}/>

        </Routes>
        </BrowserRouter>
    </AuthProvider>
    );
};

export default Rotas;