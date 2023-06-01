import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "../../services/api";

// Schema de validação 
const yupSchema = yup.object({
  senha: yup
    .string()
    .required("Informe sua senha")
    .min(8, "A senha precisa conter no mínimo 8 caracteres.")
    .matches(/[a-z]/, "Senha precisa conter letras minusculas.")
    .matches(/[A-Z]/, "Senha precisa conter letras maísculas.")
    .matches(/[0-9]/, "Senha precisa conter números.")
    .matches(
      /[}{,.^?~=+!$%\-_\/*\-+.\|@]/,
      "Senha precisa conter caracteres especiais."
    ),
  confirmarsenha: yup
    .string()
    .required("Confirme a senha.")
    .oneOf([yup.ref("senha"), null], "As senhas não são iguais."),
})
export default function FormNovaSenha() {
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const navigate = useNavigate();
  const { state } = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(yupSchema) });

  

  const { tipoTabela, email } = state;
  async function compararSenhas(data) {
      try {
        const response = await api.put(
          `/${tipoTabela}/redefinir-senha/${email}`,
          data
        );

        if (response.data) {
          navigate("/");
        }
      } catch (error) {
        console.log(error);
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
            {...register("senha", {
              required: true,
              onChange: (e) => setNovaSenha(e.target.value),
            })}
            type="password"
            className="focus:outline-none focus:border-azul-hyde border-b-2 w-full p-2  dark:text-branco  dark:bg-preto"
            placeholder="Nova senha"
          />
           {errors.senha && (
              <p className="text-red-500 pt-2 w-full">{errors.senha.message}</p>
            )}
        </div>
      </div>
      <div className="mt-10">
        <label className="text-lg font-semibold items-center text-gray-900 dark:text-branco">
          Confirmar nova senha
        </label>
        <input
          {...register("confirmarsenha", {
            required: true,
            onChange: (e) => setConfirmarSenha(e.target.value)
          })}
          type="password"
          className="focus:outline-none focus:border-azul-hyde border-b-2 w-full p-2  dark:text-branco  dark:bg-preto"
          placeholder="Confirmar nova senha"
        />
          {errors.confirmarsenha && (
              <p className="text-red-500 pt-2 w-full">
                {errors.confirmarsenha.message}
              </p>
            )}
      </div>
      <div className="mt-8 flex flex-col justify-center items-center">
        <button
          className="hover:bg-cyan-600 mb-6 bg-azul-hyde p-2 w-2/3 rounded-md text-white font-bold text-lg "
          onClick={handleSubmit(compararSenhas) }
        >
          {" "}
          Atualizar
        </button>
        <p className="text-red-500 flex justify-center"></p>
      </div>
    </div>
  );
}
