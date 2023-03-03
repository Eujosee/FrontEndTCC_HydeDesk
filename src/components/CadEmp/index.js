import api from "../../api";
import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import { CgProfile } from "react-icons/cg";
import InputMask from "react-input-mask";
import { AiFillCamera } from "react-icons/ai";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CadEmp() {
  const [status, setStatus] = useState("");
  const [statusErro, setStatusErro] = useState("");
  const [imagem, setImagem] = useState("");
  const fileInput = useRef(null);
  const [user, setUser] = useState({
    nome: "",
    cnpj: "",
    email: "",
    telefone: "",
    cep: "",
    numero_endereco: "",
    senha: "",
    confirmarsenha: "",
  });
  const [adress, setAdress] = useState({
    rua: "",
    estado: "",
    cidade: "",
    bairro: "",
  });

  const resetForm = () => {
    setUser({
      nome: "",
      cnpj: "",
      email: "",
      telefone: "",
      cep: "",
      numero_endereco: "",
      senha: "",
      confirmarsenha: "",
    });
    setAdress({
      rua: "",
      estado: "",
      cidade: "",
      bairro: "",
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

  const validarCNPJ = (cnpj) => {
    cnpj = cnpj.replace(/[^\d]+/g, "");

    if (cnpj === "") return false;

    if (cnpj.length !== 14) return false;

    // Elimina CNPJs invalidos conhecidos
    if (
      cnpj === "00000000000000" ||
      cnpj === "11111111111111" ||
      cnpj === "22222222222222" ||
      cnpj === "33333333333333" ||
      cnpj === "44444444444444" ||
      cnpj === "55555555555555" ||
      cnpj === "66666666666666" ||
      cnpj === "77777777777777" ||
      cnpj === "88888888888888" ||
      cnpj === "99999999999999"
    )
      return false;

    // Valida DVs
    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    let digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado != digitos.charAt(0)) return false;

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado != digitos.charAt(1)) return false;

    return true;
  };

  const checkCEP = async (e) => {
    if (!e.target.value) {
      setAdress({
        rua: "",
        estado: "",
        cidade: "",
        bairro: "",
      });
      return;
    }
    const cep = e.target.value.replace(/[^0-9]+/g, "");
    try {
      const res = await fetch(`http://viacep.com.br/ws/${cep}/json/`);
      const json = await res.json();
      setAdress({
        rua: json.logradouro,
        estado: json.uf,
        cidade: json.localidade,
        bairro: json.bairro,
      });
    } catch (erro) {
      setStatusErro("CEP inválido!");
    }
  };

  const config = {
    headers: { "content-type": "multipart/form-data" },
  };

  const handleCad = async (e) => {
    e.preventDefault();

    let res = validarCNPJ(user.cnpj);
    if (!res) {
      return setStatusErro("CNPJ inválido!");
    }

    try {
      let formData = new FormData();
      formData.append("nome", user.nome);
      formData.append("cnpj", user.cnpj.replace(/[^0-9]+/g, ""));
      formData.append("email", user.email);
      formData.append("telefone", user.telefone);
      formData.append("cep", user.cep.replace(/[^0-9]+/g, ""));
      formData.append("numero_endereco", user.numero_endereco);
      formData.append("foto", imagem);
      formData.append("senha", user.senha);
      formData.append("confirmarsenha", user.confirmarsenha);

      const { data } = await api.post("/empresas/cadastro", formData, config);
      toast.success(data.message, {
        position: toast.POSITION.TOP_RIGHT
    });
      setStatus(data.message);
      resetForm();
    } catch (error) {
      setStatusErro(error.response.data.message);
    }
  };


  return (
    <div className="bg-white px-10 pb-10 pt-3">
      <form encType="multipart/form">
        <div className="flex flex-col justify-center items-center mt-5">
          <label className="text-lg font-medium text-gray-900">
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
              <CgProfile size={160} />
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
        <div className="sm:flex sm:flex-col lg:grid lg:grid-cols-4 lg:gap-x-10 lg:gap-y-2">
          <div className="mt-2 col-span-2">
            <label className="text-lg font-medium text-gray-900">
              Nome da empresa *
            </label>
            <input
              className="focus:outline-none focus:border-azul-hyde border-b-2 w-full p-2"
              placeholder="Nome da empresa"
              name="nome"
              value={user.nome}
              onChange={(e) => [handleUser(e), setStatusErro("")]}
            />
          </div>
          <div className="mt-2 col-span-2">
            <label className="text-lg font-medium text-gray-900">CNPJ *</label>
            <InputMask
              className="focus:outline-none focus:border-azul-hyde border-b-2 w-full  p-2"
              placeholder="CNPJ"
              name="cnpj"
              value={user.cnpj}
              mask="99.999.999/9999-99"
              onChange={(e) => [handleUser(e), setStatusErro("")]}
              required
            />
          </div>
          <div className="mt-2 col-span-2">
            <label className="text-lg font-medium text-gray-900">Email *</label>
            <input
              type="email"
              className="focus:outline-none focus:border-azul-hyde border-b-2 w-full p-2"
              placeholder="Email"
              name="email"
              value={user.email}
              onChange={(e) => [handleUser(e), setStatusErro("")]}
            />
          </div>
          <div className="mt-2 col-span-2">
            <label className="text-lg font-medium text-gray-900">
              Telefone *
            </label>
            <InputMask
              className="focus:outline-none focus:border-azul-hyde border-b-2 w-full  p-2"
              placeholder="Telefone"
              type="tel"
              name="telefone"
              value={user.telefone}
              mask="(99) 99999-9999"
              onChange={(e) => [handleUser(e), setStatusErro("")]}
              required
            />
          </div>
          <div className="mt-2 col-span-1">
            <label className="text-lg font-medium text-gray-900">CEP *</label>
            <InputMask
              className="focus:outline-none focus:border-azul-hyde border-b-2 w-full  p-2"
              placeholder="CEP"
              name="cep"
              value={user.cep}
              mask="99999-999"
              onChange={(e) => [handleUser(e), setStatusErro("")]}
              required
              onBlur={checkCEP}
            />
          </div>
          <div className="mt-2 col-span-1">
            <label className="text-lg font-medium text-gray-900">Estado</label>
            <input
              className="focus:outline-none focus:border-azul-hyde border-b-2 w-full p-2"
              placeholder="Estado"
              name="estado"
              value={adress.estado}
              disabled
            />
          </div>
          <div className="mt-2 col-span-2">
            <label className="text-lg font-medium text-gray-900">Cidade</label>
            <input
              className="focus:outline-none focus:border-azul-hyde border-b-2 w-full p-2"
              placeholder="Cidade"
              name="cidade"
              value={adress.cidade}
              disabled
            />
          </div>
          <div className="mt-2 col-span-1">
            <label className="text-lg font-medium text-gray-900">N°</label>
            <input
              className="focus:outline-none focus:border-azul-hyde border-b-2 w-full p-2"
              placeholder="N°"
              name="numero_endereco"
              value={user.numero_endereco}
              onChange={(e) => [handleUser(e), setStatusErro("")]}
            />
          </div>
          <div className="mt-2 col-span-1">
            <label className="text-lg font-medium text-gray-900">Rua</label>
            <input
              className="focus:outline-none focus:border-azul-hyde border-b-2 w-full p-2"
              placeholder="Rua"
              name="Rua"
              value={adress.rua}
              disabled
            />
          </div>
          <div className="mt-2 col-span-2">
            <label className="text-lg font-medium text-gray-900">Bairro</label>
            <input
              className="focus:outline-none focus:border-azul-hyde border-b-2 w-full p-2"
              placeholder="Bairro"
              name="bairro"
              value={adress.bairro}
              disabled
            />
          </div>
          <div className="mt-1 col-span-4 hidden">
            <div className="flex flex-row">
              <label className="text-lg font-medium text-gray-900">
                Foto de perfil *
              </label>
              <p
                className="ml-3 mt-1 text-sm text-gray-500 dark:text-gray-300"
                id="file_input_help"
              >
                PNG, JPG ou JPEG.
              </p>
            </div>
            <input
              type="file"
              className="focus:outline-none focus:border-azul-hyde border-b-2 w-full  p-2 hidden"
              placeholder="Selecione uma foto"
              name="anexo"
              ref={fileInput}
              id="foto"
              accept=".png, .jpg, .jpeg"
              onChange={(e) => setImagem(e.target.files[0])}
              required
            />
          </div>
          <div className="mt-2 col-span-2">
            <label className="text-lg font-medium text-gray-900">Senha *</label>
            <input
              type="password"
              className="focus:outline-none focus:border-azul-hyde border-b-2 w-full p-2"
              placeholder="Senha"
              name="senha"
              value={user.senha}
              onChange={(e) => [handleUser(e), setStatusErro("")]}
            />
          </div>
          <div className="mt-2 col-span-2">
            <label className="text-lg font-medium text-gray-900">
              Confirme sua senha *
            </label>
            <input
              type="password"
              className="focus:outline-none focus:border-azul-hyde border-b-2 w-full p-2"
              placeholder="Confirme sua senha"
              name="confirmarsenha"
              value={user.confirmarsenha}
              onChange={(e) => [handleUser(e), setStatusErro("")]}
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
          <ToastContainer/>
          <p className={status ? "text-green-500" : "text-red-500"}>
            {status ? status : statusErro}
          </p>
        </div>
      </form>
      <div>
        <Link className="no-underline flex items-center " to="/login">
          <p className="text-black font-bold mb-1 text-lg">
            Já possui uma conta?
          </p>
          <p className="ml-2 text-azul-hyde font-bold mb-1 text-lg">Login</p>
        </Link>
      </div>
    </div>
  );
}

export default CadEmp;
