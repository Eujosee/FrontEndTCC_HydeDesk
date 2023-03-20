import api from "../../api";
import { useState, useRef } from "react";
import { CgProfile } from "react-icons/cg";
import { AiFillCamera } from "react-icons/ai";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import secureLocalStorage from "react-secure-storage";

function CadFunc() {
  const [status, setStatus] = useState("");
  const [statusErro, setStatusErro] = useState("");
  const [imagem, setImagem] = useState("");
  const fileInput = useRef(null);
  const id = JSON.parse(secureLocalStorage.getItem("Id"));
  const [user, setUser] = useState({
    nome: "",
    matricula: "",
    usuario: "",
    email: "",
    senha: "",
    confirmsenha: "",
  });

  const resetForm = () => {
    setUser({
      nome: "",
      matricula: "",
      usuario: "",
      email:"",
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



  
  const config = {
    headers: { "content-type": "multipart/form-data" },
  };

  const handleCad = async (e) => {
    e.preventDefault();
    try {
      let formData = new FormData();
      formData.append("nome", user.nome);
      formData.append("matricula", user.matricula);
      formData.append("usuario", user.usuario);
      formData.append("email", user.email);
      formData.append("senha", user.senha);
      formData.append("confirmsenha", user.confirmsenha);
      formData.append("foto", imagem);
      formData.append("id_empresa", id);

      const { data } = await api.post(
        "/funcionarios/cadastro",
        formData,
        config
      );
      toast.success("Funcionário cadastrado com sucesso!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setStatus(data.message);
      resetForm();
    } catch (error) {
      setStatusErro(error.response.data.message);
    }
  };

  return (
    <div className="bg-white dark:bg-preto px-10 py-4 ">
      <h1 className="font-bold text-2xl mt-4">Cadastre um funcionário</h1>
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
                  className="absolute bottom-[-0.2rem] bg-azul-hyde   p-2 rounded-full"
                />
              </label>
            </>
          ) : (
            <>
              <CgProfile size={160} className="text-gray-900 dark:text-branco" />
              <label
                htmlFor="foto"
                className="relative flex items-center justify-center w-3 h-3"
              >
                <AiFillCamera
                  size={50}
                  color="#f8f8ff  "
                  className="absolute bottom-[-0.2rem] bg-azul-hyde  p-2 rounded-full"
                />
              </label>
            </>
          )}
        </div>
        <div className="sm:flex sm:flex-col lg:grid lg:grid-cols-2 lg:gap-x-10 lg:gap-y-2">
          <div className="mt-2">
            <label className="text-lg font-medium text-gray-900 dark:text-branco">
              Nome completo
            </label>
            <input
              className="focus:outline-none focus:border-azul-hyde border-b-2 w-full  p-2 dark:bg-transparent"
              placeholder="Nome completo"
              name="nome"
              value={user.nome}
              onChange={(e) => [handleUser(e), setStatusErro("")]}
            />
          </div>

          <div className="mt-2">
            <label className="text-lg font-medium text-gray-900 dark:text-branco">
              Matrícula
            </label>
            <input
              className="focus:outline-none focus:border-azul-hyde border-b-2 w-full  p-2 dark:bg-transparent"
              placeholder="Matrícula"
              name="matricula"
              value={user.matricula}
              onChange={(e) => [handleUser(e), setStatusErro("")]}
            />
          </div>
          <div className="mt-2">
            <label className="text-lg font-medium text-gray-900 dark:text-branco">
              Nome de usuário
            </label>
            <input
              className="focus:outline-none focus:border-azul-hyde border-b-2 w-full  p-2 dark:bg-transparent"
              placeholder="Usuário"
              name="usuario"
              value={user.usuario}
              onChange={(e) => [handleUser(e), setStatusErro("")]}
            />
          </div>
          <div className="mt-2">
            <label className="text-lg font-medium text-gray-900 dark:text-branco">
              Email
            </label>
            <input
              className="focus:outline-none focus:border-azul-hyde border-b-2 w-full  p-2 dark:bg-transparent"
              placeholder="Email"
              name="email"
              value={user.email}
              onChange={(e) => [handleUser(e), setStatusErro("")]}
            />
          </div>
          <div className="mt-1 hidden">
            <input
            id="foto"
              type="file"
              className="focus:outline-none focus:border-azul-hyde border-b-2 w-full  p-2"
              placeholder="Selecione uma foto"
              name="anexo"
              ref={fileInput}
              accept=".png, .jpg, .jpeg"
              onChange={(e) => setImagem(e.target.files[0])}
              required
            />
          </div>
          <div className="mt-2">
            <label className="text-lg font-medium text-gray-900 dark:text-branco">Senha</label>
            <input
              type="password"
              className="focus:outline-none focus:border-azul-hyde border-b-2 w-full  p-2 dark:bg-transparent"
              placeholder="Senha"
              name="senha"
              value={user.senha}
              onChange={(e) => [handleUser(e), setStatusErro("")]}
            />
          </div>
          <div className="mt-2">
            <label className="text-lg font-medium text-gray-900 dark:text-branco">
              Confirme sua senha
            </label>
            <input
              type="password"
              className="focus:outline-none focus:border-azul-hyde border-b-2 w-full  p-2 dark:bg-transparent"
              placeholder="Confirme sua senha"
              name="confirmsenha"
              value={user.confirmsenha}
              onChange={handleUser}
            />
          </div>
        </div>
        <div className="mt-8 flex flex-col justify-center items-center">
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
    </div>
  );
}

export default CadFunc;
