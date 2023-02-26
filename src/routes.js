import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider, Context } from "./Context/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import CadastroFunc from "./pages/CadastroFunc";
import Perfil from "./pages/Perfil";
import RecuperarSenha from "./pages/RecuperaSenha";
import Detalhes from "./pages/Detalhes";
import ListaFunc from "./pages/ListaFunc";
import ListaChamados from "./pages/ListaChamados";
import MudaSenha from "./pages/MudaSenha";
import AbrirChamado from "./pages/AbrirChamado";
import Pag404 from "./pages/NotFound";
import { useContext } from "react";

function PrivateRoutes({ children }) {
  const { authenticated } = useContext(Context)
  return authenticated ? children : <Navigate to="/login" />;
}

function EmpresaPrivateRoutes({ children }) {
  const type = JSON.parse(localStorage.getItem("Tipo"));
  return type == "empresas" ? children : <Navigate to="/login" />;
}

const Rotas = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/detalhes/:id"
            element={
              <PrivateRoutes>
                <Detalhes />
              </PrivateRoutes>
            }
          />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route
            path="/cadastro-funcionario"
            element={
              <EmpresaPrivateRoutes>
                <CadastroFunc />
              </EmpresaPrivateRoutes>
            }
          />
          <Route
            path="/perfil"
            element={
              <PrivateRoutes>
                <Perfil />
              </PrivateRoutes>
            }
          />
          <Route path="/recuperar" element={<RecuperarSenha />} />
          <Route
            path="/lista-funcionarios"
            element={
              <EmpresaPrivateRoutes>
                <ListaFunc />
              </EmpresaPrivateRoutes>
            }
          />
          <Route
            path="/lista-chamados"
            element={
              <PrivateRoutes>
                <ListaChamados />
              </PrivateRoutes>
            }
          />
          <Route path="/mudar-senha" element={<MudaSenha />} />
          <Route
            path="/abrir-chamado"
            element={
              <PrivateRoutes>
                <AbrirChamado />
              </PrivateRoutes>
            }
          />
          <Route path="*" element={<Pag404 />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default Rotas;
