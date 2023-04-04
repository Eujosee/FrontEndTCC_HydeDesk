import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import HomeComercial from "../pages/HomeComercial";
import HomeInstitucional from "../pages/HomeInstitucional";
import Login from "../pages/Login";
import ListaChamados from "../pages/ListaChamados";
import Cadastro from "../pages/Cadastro";
import RecuperarSenha from "../pages/RecuperarSenha";
import ConfirmarToken from "../pages/ConfirmarToken";
import MudarSenha from "../pages/MudarSenha";
import PageNotFound from "../pages/PageNotFound";
import Pagamento from "../pages/Pagamento";
import ListaFuncionarios from "../pages/ListaFuncionarios";
import CadastroFuncionario from "../pages/CadastroFuncionario";
import AbrirChamado from "../pages/AbrirChamado";
import Detalhes from "../pages/Detalhes";

import { useContext } from "react";
import { Context } from "../context/AuthContext";
import secureLocalStorage from "react-secure-storage";
import Perfil from "../pages/Perfil";

function PrivateRoutes({ children }) {
  const { authenticated } = useContext(Context);
  return authenticated ? children : <Navigate to="/login" />;
}

function EmpresaPrivateRoutes({ children }) {
  const type = JSON.parse(secureLocalStorage.getItem("Tipo"));
  return type == "empresas" ? children : <Navigate to="/login" />;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeComercial />,
  },
  {
    path: "/institucional",
    element: <HomeInstitucional />,
  },
  {
    path: "/pagamento/:plano",
    element: <Pagamento />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/cadastro",
    element: <Cadastro />,
  },
  {
    path: "/recuperar",
    element: <RecuperarSenha />,
  },
  {
    path: "/recuperar/confirmar-token",
    element: <ConfirmarToken />,
  },
  {
    path: "/recuperar/confirmar-token/trocar-senha",
    element: <MudarSenha />,
  },
  {
    path: "/lista-chamados",
    element: (
      <PrivateRoutes>
        <ListaChamados />
      </PrivateRoutes>
    ),
  },
  {
    path: "/abrir-chamado",
    element: (
      <PrivateRoutes>
        <AbrirChamado />
      </PrivateRoutes>
    ),
  },
  {
    path: "/detalhes/:id",
    element: (
      <PrivateRoutes>
        <Detalhes />
      </PrivateRoutes>
    ),
  },
  {
    path: "/lista-funcionarios",
    element: (
      <EmpresaPrivateRoutes>
        <ListaFuncionarios />
      </EmpresaPrivateRoutes>
    ),
  },
  {
    path: "/cadastro-funcionario",
    element: (
      
        <CadastroFuncionario />
      
    ),
  },
  {
    path: "/perfil",
    element: (
      <PrivateRoutes>
        <Perfil />
      </PrivateRoutes>
    ),
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

export default function Routes() {
  return <RouterProvider router={router} />;
}
