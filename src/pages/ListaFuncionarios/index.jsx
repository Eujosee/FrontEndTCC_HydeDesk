import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BiSearchAlt2 } from "react-icons/bi";
import ModalFuncionario from "../../components/ModalFuncionario";
import api from "../../services/api";
import secureLocalStorage from "react-secure-storage";
import { ToastContainer, toast } from "react-toastify";

export default function ListaFuncionarios() {
  const navigate = useNavigate();
  const [funcionarios, setFuncionarios] = useState([]);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  let [isOpen, setIsOpen] = useState(false);
  let [dados, setDados] = useState("");
  const [filtro, setFiltro] = useState({
    status_empresa: "",
    nome: "",
  });

  const type = JSON.parse(secureLocalStorage.getItem("Tipo"));
  const id = JSON.parse(secureLocalStorage.getItem("Id"));

  const abrirModal = (item) => {
    setDados(item);
    setIsOpen(true);
  };

  const changeFiltro = (e) => {
    setFiltro({
      ...filtro,
      [e.target.name]: e.target.value,
    });
  };
  // Busca todos os funcionários
  async function getAllFuncionarios(e) {
    try {
      const { data } = await api.get("/funcionarios?id_empresa=" + id);
      setFuncionarios(data);
      return data;
    } catch (error) {
      setStatus("Erro ao buscar os funcionários!");
    }
  }

  // Busca funcionários por nome
  const handleFiltroName = async (e) => {
    e.preventDefault();
    const todos = await getAllFuncionarios(e);
    const filtrados = todos.filter((item) => item.nome_funcionario == filtro.nome);
    setFuncionarios(filtrados);
    setLoading(false);
  };

  // Busca funcionários por status
  const handleFiltro = async (e) => {
    e.preventDefault();
    const todos = await getAllFuncionarios(e);
    const filtrados = todos.filter(item => item.status_funcionario == filtro.status_empresa);
    if(filtro.status_empresa == "todos"){
      setFuncionarios(todos);
    }else{
      setFuncionarios(filtrados);
      setLoading(false);
    }
  };

  // Busca funcionários quando a página é carregada
  useEffect(() => {
    getAllFuncionarios();
    setLoading(false);
  }, []);

  return (
    <>
      <Header />
      <ModalFuncionario
        dataFunc={dados}
        open={isOpen}
        onClose={() => setIsOpen(false)}
        toast={toast}
        navigate={navigate}
      />
      <ToastContainer />
      <div className="flex flex-col h-screen overflow-hidden dark:bg-preto">
        <div className="ml-6 mt-5 px-5 flex flex-col md:flex-row md:space-x-6">
          <h1 className="text-3xl font-semibold lg:text-3xl dark:text-branco">
            Lista de funcionários
          </h1>
          <Link
            to="/cadastro-funcionario"
            class="w-full md:w-40 rounded-md bg-azul-hyde px-3.5 py-1.5 text-center font-semibold leading-7 text-white shadow-sm hover:bg-cyan-600 "
          >
            <span className="flex justify-center items-center">Novo</span>
          </Link>
        </div>

        <div className="w-full lg:w-2/4 ml-6 px-3 flex flex-col gap-4">
            <div className="w-full lg:w--full flex flex-col items-center">
              <label htmlFor="empresa" className="dark:text-gray-50 w-full text-start ml-4">
                Pesquisar:
              </label>
              <div className="w-full flex items-center gap-4 ">
                <input
                  className="focus:outline-none ml-2 dark:bg-transparent dark:text-gray-50 focus:border-b-azul-hyde border-b-2 w-full p-2"
                  placeholder={
                    type == "tecnicos"
                      ? "Nome da empresa"
                      : type == "empresas"
                      ? "Nome do funcionário"
                      : "Protocolo"
                  }
                  name="nome"
                  onChange={changeFiltro}
                  required
                />
                <BiSearchAlt2
                  size={20}
                  className=" text-gray-400  cursor-pointer"
                  onClick={handleFiltroName}
                />
              </div>
            </div>
            <div className="flex flex-col items-center  lg:full">
              <div className="w-full flex flex-col items-center">
                <label htmlFor="status_empresa" className="dark:text-gray-50 w-full text-start ml-4 cursor-pointer">
                  Filtrar:
                </label>
                <div className="w-full flex flex-1 gap-2 lg:gap-4 items-center ">
                  <select
                    className="focus:outline-none dark:bg-transparent  dark:text-gray-50 focus:border-b-azul-hyde ml-2 border-b-2  w-full p-2"
                    name="status_empresa"
                    onChange={changeFiltro}
                    id="status_chamado"
                    required
                  >
                    <option
                      className="dark:text-branco dark:bg-gray-800 dark:hover:bg-gray-800"
                      selected
                      disabled
                    >
                      Selecione uma opção
                    </option>
                    <option
                      className="dark:text-branco dark:bg-gray-800 dark:hover:bg-gray-800"
                      value="todos"
                    >
                      Todos
                    </option>
                    <option
                      className="dark:text-branco dark:bg-gray-800 dark:hover:bg-gray-800 "
                      value="Inativo"
                    >
                      Inativo
                    </option>
                    <option
                      className="dark:text-branco dark:bg-gray-800 dark:hover:bg-gray-800"
                      value="Ativo"
                    >
                      Ativo
                    </option>
                    
                  </select>
                  <BiSearchAlt2
                    size={20}
                    className=" text-gray-400  cursor-pointer"
                    onClick={handleFiltro}
                    disabled={filtro.status_chamado === ""}
                  />
                </div>
              </div>
            </div>
          </div>  

        <div className="mx-5 my-5 p-6 overflow-x-auto overflow-y-hidden">
          <table className="max-w-full w-full  min-h-fit rounded-t-md ">
            <thead align="start">
              <tr className="bg-azul-hyde text-slate-50 text-lg font-bold">
                <th scope="col" className=" px-2 py-3 text-lg text-start">
                  Funcionário
                </th>
                <th scope="col" className="px-2 py-3 text-lg text-start">
                  Matrícula
                </th>
                <th scope="col" className="px-2 py-3 text-lg text-start">
                  Usuário
                </th>
                <th scope="col" className="px-2 py-3 text-lg text-start">
                  Email
                </th>
                <th scope="col" className="px-2 py-3 text-lg text-start ">
                  Status
                </th>
                <th scope="col" className="px-2 py-3 text-lg text-start whitespace-nowrap">
                  Ativar / Desativar
                </th>
              </tr>
            </thead>
            <tbody>
              {funcionarios.map((item) => {
                return (
                  <tr key={item.id_funcionario}
                    align="center"
                    className="border-b odd:bg-white dark:odd:bg-gray-900 even:bg-slate-100 dark:even:bg-gray-800 font-medium hover:bg-slate-200 dark:hover:bg-gray-900"
                  >
                    <td className="flex grow-0 flex-row items-center space-y-8 text-lg text-gray-900 dark:text-branco px-6 py-4 whitespace-nowrap">
                      <img
                        src={
                          "https://hydedesk-api.azurewebsites.net/" + item.foto
                        }
                        alt="Foto"
                        className="h-10 w-10 text-gray-600 mr-4 rounded-full"
                      />
                      {item.nome_funcionario}
                    </td>
                    <td className="text-lg text-gray-900 dark:text-branco px-6 py-4 whitespace-nowrap">
                      {item.matricula}
                    </td>
                    <td className="text-lg text-gray-900 dark:text-branco px-6 py-4 whitespace-nowrap">
                      {item.usuario}
                    </td>
                    <td className="text-lg text-gray-900 dark:text-branco px-6 py-4 whitespace-nowrap">
                      {item.email_funcionario}
                    </td>
                    <td
                      data-type={item.status_funcionario}
                      className="text-lg data-[type=Desativado]:text-red-500 data-[type=Ativo]:text-green-500 font-bold px-6 py-4  whitespace-nowrap"
                    >
                      {item.status_funcionario}
                    </td>
                    <td className="text-lg text-azul-hyde px-6 py-4 whitespace-nowrap">
                      <button onClick={() => abrirModal(item)}>
                        <PencilSquareIcon className="h-6 w-6" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {loading && (
            <div className="flex gap-2 items-center justify-center m-auto w-64 mt-10">
              <AiOutlineLoading3Quarters
                size={25}
                className="icon dark:text-branco"
              />
              <p className="dark:text-branco"> Carregando...</p>
            </div>
          )}

          {funcionarios.length < 1 && !loading && !status && (
            <div className="flex gap-2 items-center justify-center m-auto w-64 mt-10">
              <p className="dark:text-branco"> Você não possui funcionários.</p>
            </div>
          )}
          {status && !loading && (
            <div className="flex gap-2 items-center justify-center m-auto w-64 mt-10">
              <p className="dark:text-branco">{status}</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
