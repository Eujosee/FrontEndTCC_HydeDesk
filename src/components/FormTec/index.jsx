import api from "../../services/api";
import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import { CgProfile } from "react-icons/cg";
import InputMask from "react-input-mask";
import { AiFillCamera } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function FormTec() {
  const [status, setStatus] = useState("");
  const [statusErro, setStatusErro] = useState("");
  const [imagem, setImagem] = useState("");
  const fileInput = useRef(null);
  const [user, setUser] = useState({
    nome: "",
    cpf: "",
    email: "",
    telefone: "",
    especialidade: "",
    senha: "",
    confirmsenha: "",
  });

  const resetForm = () => {
    setUser({
      nome: "",
      cpf: "",
      email: "",
      telefone: "",
      especialidade: "",
      senha: "",
      confirmsenha: "",
    });
    fileInput.current.value = "";
    setImagem("");
  };

  const handleUser = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const validarCPF = (cpfs) => {
    let cpf = cpfs.replace(/[^\d]+/g, "");
    if (cpf == "") return false;
    // Elimina CPFs invalidos conhecidos
    if (
      cpf.length != 11 ||
      cpf === "00000000000" ||
      cpf === "11111111111" ||
      cpf === "22222222222" ||
      cpf === "33333333333" ||
      cpf === "44444444444" ||
      cpf === "55555555555" ||
      cpf === "66666666666" ||
      cpf === "77777777777" ||
      cpf === "88888888888" ||
      cpf === "99999999999"
    )
      return false;
    // Valida 1o digito
    let add = 0;
    for (let i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);
    let rev = 11 - (add % 11);
    if (rev === 10 || rev === 11) rev = 0;
    if (rev != parseInt(cpf.charAt(9))) return false;
    // Valida 2o digito
    add = 0;
    for (let i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev === 10 || rev === 11) rev = 0;
    if (rev != parseInt(cpf.charAt(10))) return false;
    return true;
  };

  const config = {
    headers: { "content-type": "multipart/form-data" },
  };
  const sendEmail = async (data) => {
    let emailData = {
      toemail: data.email,
      nome: data.nome,
      tipo: "cadastro",
    };
    const email = await axios.post(
      "https://prod2-16.eastus.logic.azure.com:443/workflows/84d96003bf1947d3a28036ee78348d4b/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=5BhPfg9NSmVU4gYJeUVD9yqkJPZACBFFxj0m1-KIY0o",
      emailData
    );
  };
  const handleCad = async (e) => {
    e.preventDefault();

    let res = validarCPF(user.cpf);
    if (!res) {
      return setStatusErro("CPF inválido!");
    }

    try {
      let formData = new FormData();
      formData.append("nome", user.nome);
      formData.append("cpf", user.cpf.replace(/[^0-9]+/g, ""));
      formData.append("email", user.email);
      formData.append("telefone", user.telefone.replace(/[^0-9]+/g, ""));
      formData.append("especialidade", user.especialidade);
      formData.append("foto", imagem);
      formData.append("senha", user.senha);
      formData.append("confirmsenha", user.confirmsenha);

      const { data } = await api.post("/tecnicos/cadastro", formData, config);
      setStatus(data.message);
      toast.success("Técnico cadastrado com sucesso", {
        position: toast.POSITION.TOP_RIGHT,
      });
      window.location.href = "/login";
      resetForm();
    } catch (error) {
      setStatusErro(error.response.data.message);
    }
  };

  return (
    <div className="bg-white dark:bg-preto px-10 pb-10 pt-3">
      <form encType="multipart/form">
        <div className="flex flex-col justify-center items-center mt-5">
          <label className="text-lg font-medium text-gray-900 dark:text-branco">
            Foto de perfil
          </label>
          {imagem ? (
            <>
              <img
                className="w-40 h-40 rounded-full"
                src={URL.createObjectURL(imagem)}
                alt="sua foto"
              />
              <label
                htmlFor="foto"
                className="relative flex items-center justify-center w-3 h-3"
              >
                <AiFillCamera
                  size={50}
                  color="#f8f8ff    "
                  className="absolute bottom-[-0.2rem] bg-azul-hyde  p-2 rounded-full"
                />
              </label>
            </>
          ) : (
            <>
              <CgProfile size={160} className="dark:text-white" />
              <label
                htmlFor="foto"
                className="relative flex items-center justify-center w-3 h-3"
              >
                <AiFillCamera
                  size={50}
                  color="#f8f8ff"
                  className="absolute bottom-[-0.2rem] bg-azul-hyde p-2 rounded-full"
                />
              </label>
            </>
          )}
        </div>
        <div className="sm:flex sm:flex-col lg:grid lg:grid-cols-2 lg:gap-x-10 lg:gap-y-2">
          <div className="mt-2">
            <label className="text-lg font-medium text-gray-900 dark:text-branco">
              Nome completo *
            </label>
            <input
              className="focus:outline-none focus:border-azul-hyde border-b-2 w-full  p-2 dark:bg-preto dark:text-branco"
              placeholder="Nome completo"
              name="nome"
              value={user.nome}
              onChange={(e) => [handleUser(e), setStatusErro("")]}
              required
            />
          </div>
          <div className="mt-2">
            <label className="text-lg font-medium text-gray-900 dark:text-branco">
              CPF *
            </label>
            <InputMask
              className="focus:outline-none focus:border-azul-hyde border-b-2 w-full  p-2 dark:bg-preto dark:text-branco"
              placeholder="CPF"
              name="cpf"
              value={user.cpf}
              mask="999.999.999-99"
              onChange={(e) => [handleUser(e), setStatusErro("")]}
              required
            />
          </div>

          <div className="mt-2">
            <label className="text-lg font-medium text-gray-900 dark:text-branco">
              Email *
            </label>
            <input
              type="email"
              className="focus:outline-none focus:border-azul-hyde border-b-2 w-full  p-2 dark:bg-preto dark:text-branco"
              placeholder="Email"
              name="email"
              value={user.email}
              onChange={(e) => [handleUser(e), setStatusErro("")]}
              required
            />
          </div>
          <div className="mt-2">
            <label className="text-lg font-medium text-gray-900 dark:text-branco">
              Telefone *
            </label>
            <InputMask
              className="focus:outline-none focus:border-azul-hyde border-b-2 w-full  p-2 dark:bg-preto dark:text-branco"
              placeholder="Telefone"
              type="tel"
              name="telefone"
              value={user.telefone}
              mask="(99) 99999-9999"
              onChange={(e) => [handleUser(e), setStatusErro("")]}
              required
            />
          </div>
          <div className="mt-2 col-span-2">
            <label className="text-lg font-medium text-gray-900 dark:text-branco">
              Especialidade *
            </label>
            <select
              className="focus:outline-none focus:border-azul-hyde border-b-2 w-full  p-2 dark:bg-preto dark:text-branco"
              name="especialidade"
              onChange={(e) => [handleUser(e), setStatusErro("")]}
              value={user.especialidade}
              required
            >
              <option selected>Selecione uma opção</option>
              <option value="Desenvolvedor">Desenvolvedor</option>
              <option value="Infraestrutura">Infraestrutura</option>
              <option value="Sistemas operacionais">
                Sistemas operacionais
              </option>
            </select>
          </div>
          <div className="mt-1 hidden">
            <div className="flex flex-row">
              <label className="text-lg font-medium text-gray-900 dark:text-branco">
                Foto de perfil *
              </label>
              <p
                className="ml-3 mt-1 text-sm text-gray-500 dark:text-gray-300 "
                id="file_input_help"
              >
                PNG, JPG ou JPEG.
              </p>
            </div>
            <input
              type="file"
              className="focus:outline-none focus:border-azul-hyde border-b-2 w-full  p-2"
              placeholder="Selecione uma foto"
              name="anexo"
              id="foto"
              ref={fileInput}
              accept=".png, .jpg, .jpeg"
              onChange={(e) => setImagem(e.target.files[0])}
              required
            />
          </div>
          <div className="mt-2">
            <label className="text-lg font-medium text-gray-900 dark:text-branco">
              Senha *
            </label>
            <input
              type="password"
              className="focus:outline-none focus:border-azul-hyde border-b-2 w-full  p-2 dark:bg-preto dark:text-branco"
              placeholder="Senha"
              name="senha"
              value={user.senha}
              onChange={(e) => [handleUser(e), setStatusErro("")]}
              required
            />
          </div>
          <div className="mt-2">
            <label className="text-lg font-medium text-gray-900 dark:text-branco">
              Confirme sua senha *
            </label>
            <input
              type="password"
              className="focus:outline-none focus:border-azul-hyde border-b-2 w-full  p-2 dark:bg-preto dark:text-branco"
              placeholder="Confirme sua senha"
              name="confirmsenha"
              value={user.confirmsenha}
              onChange={(e) => [handleUser(e), setStatusErro("")]}
              required
            />
          </div>
        </div>
        <div className="mt-8 flex justify-center items-center flex-col">
          <button
            type="submit"
            className="hover:bg-cyan-600 mb-6 bg-azul-hyde p-2 rounded-md text-white font-bold text-lg w-80"
            onClick={handleCad}
          >
            Cadastrar
          </button>
          <ToastContainer />
          <p className={status ? "text-green-500" : "text-red-500"}>
            {status ? status : statusErro}
          </p>
        </div>
      </form>
      <div>
        <Link className="no-underline flex items-center " to="/login">
          <p className="text-black font-bold text-lg mb-1 dark:text-branco">
            Já possui uma conta?
          </p>
          <p className="ml-2 text-azul-hyde text-lg font-bold mb-1">Login</p>
        </Link>
      </div>
    </div>
  );
}
