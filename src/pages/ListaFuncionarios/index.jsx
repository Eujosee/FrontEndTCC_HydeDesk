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
  const [filtro, setFiltro] = useState({
    status_empresa: "",
    nome: "",
  });

  const id = JSON.parse(secureLocalStorage.getItem("Id"));
  let [isOpen, setIsOpen] = useState(false);
  let [dados, setDados] = useState("");

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

  const handleFiltroName = async (e) => {
    e.preventDefault();
    try {
      if (filtro.nome !== "") {
        const { data } = await api.get(
          "/funcionarios?nome=" + filtro.nome + "&id_empresa=" + id
        );
        setFuncionarios(data);
        console.log(data);
      }
    } catch (error) {}
  };

  const handleFiltro = async (e) => {
    e.preventDefault();
    try {
      if (filtro.nome && filtro.status_empresa) {
        const { data } = await api.get(
          "/funcionarios?status_funcionario=" +
            filtro.status_empresa +
            "&nome=" +
            filtro.nome +
            "&id_empresa=" +
            id
        );
        setFuncionarios(data);
      } else if (filtro.status_empresa) {
        const { data } = await api.get(
          "/funcionarios?status_funcionario=" +
            filtro.status_empresa +
            "&id_empresa=" +
            id
        );
        console.log(data);
        setFuncionarios(data);
      }
    } catch (error) {
      setStatus("Erro ao buscar os funcionários!");
    }
  };
  useEffect(() => {
    (async () => {
      try {
        if (id) {
          const { data } = await api.get("/funcionarios?id_empresa=" + id);
          setFuncionarios(data);
          setLoading(false);
        }
      } catch (error) {
        setStatus("Erro ao buscar os funcionários!");
      }
    })();
  }, [id]);

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
        <div className="mt-5 px-5 flex flex-col md:flex-row md:space-x-6">
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

        <div className="flex flex-col w-full mt-8 p-5 space-y-4 md:space-y-0 md:flex-row md:space-x-8">
          <div className="w-full md:w-1/4 flex items-center relative">
            <label className="dark:text-branco">Pesquisar:</label>
            <input
              className="focus:outline-none ml-2 focus:border-b-azul-hyde border-b-2 w-full p-2 dark:bg-transparent dark:text-branco"
              placeholder="Nome completo"
              name="nome"
              onChange={changeFiltro}
              required
            />
            <BiSearchAlt2
              size={20}
              className="absolute text-gray-400 right-3 cursor-pointer"
              onClick={handleFiltroName}
            />
          </div>
          <div className="flex flex-row items-center md:w-1/3">
            <label className="dark:text-branco">Filtrar:</label>
            <div className="w-full">
              <select
                className="focus:outline-none focus:border-b-azul-hyde ml-2 border-b-2 w-full p-2 dark:bg-transparent dark:text-branco"
                name="status_empresa"
                onChange={changeFiltro}
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
                  value="ativo"
                >
                  Ativo
                </option>
                <option
                  className="dark:text-branco dark:bg-gray-800 dark:hover:bg-gray-800"
                  value="inativo"
                >
                  Inativo
                </option>
              </select>
            </div>
          </div>
          <button
            className="rounded-md bg-azul-hyde px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-cyan-600"
            onClick={handleFiltro}
          >
            Pesquisar
          </button>
        </div>

        <div className="mx-5 overflow-x-auto rounded-t-xl">
          <table className="min-w-full">
            <thead align="center">
              <tr className="bg-azul-hyde text-slate-50 text-lg font-bold">
                <th scope="col" className="px-6 py-4">
                  Funcionário
                </th>
                <th scope="col" className="px-6 py-4">
                  Matrícula
                </th>
                <th scope="col" className="px-6 py-4">
                  Usuário
                </th>
                <th scope="col" className="px-6 py-4">
                  Email
                </th>
                <th scope="col" className="px-6 py-4 ">
                  Status
                </th>
                <th scope="col" className="px-6 py-4">
                  Ativar / Desativar
                </th>
              </tr>
            </thead>
            <tbody>
              {funcionarios.map((item) => {
                console.log(item);
                return (
                  <tr
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
