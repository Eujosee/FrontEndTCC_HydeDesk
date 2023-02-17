import { BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import { useContext } from "react"
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
import { Context } from "./Context/AuthContext";


function PrivateRoutes({children}){
    const { authenticated }  = useContext(Context);

    return authenticated ? children : <Navigate to="/login"/>
    
}
const Rotas = () => {
    return (

    <AuthProvider>
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/detalhes/:id" element={ <PrivateRoutes><Detalhes/></PrivateRoutes> }/>
            <Route path="/cadastro" element={<Cadastro/>}/>
            <Route path="/cadastro-funcionario" element={<CadastroFunc/>}/>
            <Route path="/perfil" element={<PrivateRoutes><Perfil/></PrivateRoutes>}/>
            <Route path="/recuperar" element={<RecuperarSenha/>}/>
            <Route path="/lista-funcionarios" element={<PrivateRoutes><ListaFunc/></PrivateRoutes>}/>
            <Route path="/lista-chamados-empresa" element={<PrivateRoutes><ListaChamados/></PrivateRoutes>}/>
            <Route path="/lista-chamados-funcionarios" element={<PrivateRoutes><ListaChamadosFunc/></PrivateRoutes>}/>
            <Route path="/mudar-senha" element={<MudaSenha/>}/>
            <Route path="/abrir-chamado" element={<PrivateRoutes><AbrirChamado/></PrivateRoutes>}/>

        </Routes>
        </BrowserRouter>
    </AuthProvider>
    );
};

export default Rotas;