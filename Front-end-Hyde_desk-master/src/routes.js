import { BrowserRouter, Route, Routes} from "react-router-dom";

import { AuthProvider } from './Context/AuthContext'
import Home from './pages/home'
import Login from './pages/Login'
import CadastroTec from './pages/CadastroTecnico'
import CadastroEmp from "./pages/CadastroEmpresa";
import CadastroFunc from "./pages/CadastroFunc";

const Rotas = () => {
    return (

    <AuthProvider>
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/cadastro-tecnico" element={<CadastroTec/>}/>
            <Route path="/cadastro-empresarial" element={<CadastroEmp/>}/>
            <Route path="/cadastro-funcionario" element={<CadastroFunc/>}/>
        </Routes>
        </BrowserRouter>
    </AuthProvider>
    );
};

export default Rotas;