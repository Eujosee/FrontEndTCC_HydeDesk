import { createContext, useEffect, useState } from "react";
import api from "../api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import secureLocalStorage from "react-secure-storage";

const Context = createContext();

function AuthProvider({ children }) {
  const [status, setStatus] = useState("");

  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const activeToken = secureLocalStorage.getItem("Token");

    console.log(activeToken)

    if (activeToken) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(activeToken)}`;
      setAuthenticated(true);
    }

    setLoading(false);
  }, []);

  const handleLogin = async (user, label) => {
    switch (label) {
      case "cpf":
        try {
          const { data } = await api.post("/tecnicos/login", user);
          secureLocalStorage.setItem("Token", JSON.stringify(data.token));
          secureLocalStorage.setItem("Id", JSON.stringify(data.id));
          secureLocalStorage.setItem("Tipo", JSON.stringify(data.tipo));
          api.defaults.headers.Authorization = `Bearer ${data.token}`;
          setAuthenticated(true);
          window.location.href = "/";
          toast.success("Login realizado com sucesso!", {
            position: toast.POSITION.TOP_RIGHT,
          });
        } catch (error) {
          toast.error(error.response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
          // setStatus(error.response.data.message);
          console.log(error);
        }
        break;
      case "cnpj":
        try {
          const { data } = await api.post("/empresas/login", user);
          secureLocalStorage.setItem("Token", JSON.stringify(data.token));
          secureLocalStorage.setItem("Id", JSON.stringify(data.id));
          secureLocalStorage.setItem("Tipo", JSON.stringify(data.tipo));
          api.defaults.headers.Authorization = `Bearer ${data.token}`;
          setAuthenticated(true);
          window.location.href = "/";
          toast.success("Login realizado com sucesso!", {
            position: toast.POSITION.TOP_RIGHT,
          });
        } catch (error) {
          toast.error(error.response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
          // setStatus(error.response.data.message);
          console.error(error);
        }

        break;
      case "usuario":
        try {
          const { data } = await api.post("/funcionarios/login", user);

          secureLocalStorage.setItem("Token", JSON.stringify(data.token));
          secureLocalStorage.setItem("Id", JSON.stringify(data.id));
          secureLocalStorage.setItem("Tipo", JSON.stringify(data.tipo));
          api.defaults.headers.Authorization = `Bearer ${data.token}`;
          setAuthenticated(true);
          window.location.href = "/";
          toast.success("Login realizado com sucesso!", {
            position: toast.POSITION.TOP_RIGHT,
          });
        } catch (error) {
          toast.error(error.response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
          // setStatus(error.response.data.message);
        }
        break;

      default:
        setStatus("Selecione uma opção!");
        break;
    }
  };

  function handleLogout() {
    setAuthenticated(false);
    secureLocalStorage.removeItem("Token");
    secureLocalStorage.removeItem("Id");
    secureLocalStorage.removeItem("Tipo");
    api.defaults.headers.Authorization = undefined;
    window.location.href = "/";
  }

  if (loading) {
    return <h1>Carregando</h1>;
  }

  return (
    <Context.Provider
      value={{ authenticated, handleLogin, handleLogout, status }}
    >
      {children}
    </Context.Provider>
  );
}

export { Context, AuthProvider };
