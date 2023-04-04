import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function FormNovaSenha() {
  const [novaSenha, setNovaSenha] = useState("");
  const [senhaErrada, setSenhaErrada] = useState(false);
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const navigate = useNavigate();
  const { state } = useLocation();

  const { tipoTabela, email } = state;
  async function compararSenhas() {
    if (novaSenha === confirmarSenha) {
      setSenhaErrada(false);
      const data = {
        senha: novaSenha,
      };
      try {
        const response = await api.put(
          `/${tipoTabela}/redefinir-senha/${email}`,
          data
        );
        console.log(response);

        if (response.data) {
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setSenhaErrada(true);
    }
  }
  return (
    <div className="bg-white px-10 py-10 dark:bg-preto">
      <div>
        <div>
          <label className="text-lg font-semibold items-center text-gray-900 dark:text-branco">
            Nova Senha
          </label>
          <input
            value={novaSenha}
            onChange={(e) => [setNovaSenha(e.target.value)]}
            type="password"
            className="focus:outline-none focus:border-azul-hyde border-b-2 w-full p-2  dark:text-branco  dark:bg-preto"
            placeholder="Nova senha"
          />
        </div>
      </div>
      <div className="mt-10">
        <label className="text-lg font-semibold items-center text-gray-900 dark:text-branco">
          Confirmar nova senha
        </label>
        <input
          value={confirmarSenha}
          onChange={(e) => [setConfirmarSenha(e.target.value)]}
          F
          type="password"
          className="focus:outline-none focus:border-azul-hyde border-b-2 w-full p-2  dark:text-branco  dark:bg-preto"
          placeholder="Confirmar nova senha"
        />
      </div>
      {senhaErrada ? <p>As senha estão diferentes</p> : null}
      <div className="mt-8 flex flex-col justify-center items-center">
        <button
          className="hover:bg-cyan-600 mb-6 bg-azul-hyde p-2 w-2/3 rounded-md text-white font-bold text-lg "
          onClick={compararSenhas}
        >
          {" "}
          Atualizar
        </button>
        <p className="text-red-500 flex justify-center"></p>
      </div>
    </div>
  );
}
