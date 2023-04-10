// React
import { useEffect, useState } from "react";
import moment from "moment";

// Components
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Dropdown from "../../components/Dropdown";
import PaginationButton from "../../components/PaginationButton";

// Icons
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BiSearchAlt2 } from "react-icons/bi";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/20/solid";

import { Link } from "react-router-dom";
import api from "../../services/api";
import secureLocalStorage from "react-secure-storage";
import "./index.css";

export default function ListaChamados() {
  const [chamados, setChamados] = useState([]);
  const [chamadoAceito, setChamadoAceito] = useState([]);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [filtroData, setFiltroData] = useState();

  const [filtro, setFiltro] = useState({
    status_chamado: "",
    empresa: "",
  });

  const type = JSON.parse(secureLocalStorage.getItem("Tipo"));
  const id = JSON.parse(secureLocalStorage.getItem("Id"));

  const changeFiltro = (e) => {
    setFiltro({
      ...filtro,
      [e.target.name]: e.target.value,
    });
  };

  // Paginação
  const [pagination, setPagination] = useState(null);

  function genPagination(from, to) {
    setPagination(
      chamados.reverse().map((item, index) => {
        if (index >= from && index < to) {
          return (
            <tr
              key={item.id_chamado}
              align="start"
              className="border-b odd:bg-white dark:odd:bg-gray-900 even:bg-slate-100 dark:even:bg-gray-800 font-medium hover:bg-slate-200 dark:hover:bg-gray-900"
            >
              {type === "tecnicos" && (
                <td className="text-md text-gray-900 dark:text-branco px-2 py-4 whitespace-nowrap">
                  {item.nome_empresa}
                </td>
              )}
              {type === "empresas" && (
                <td className="text-md text-start text-gray-900 dark:text-branco px-2 py-4 whitespace-nowrap">
                  {item.nome_funcionario}
                </td>
              )}
              <td className=" flex flex-col text-md text-gray-900 dark:text-branco px-2 py-4 whitespace-nowrap ">
                {item.problema}
                <span className="text-sm text-gray-600 dark:text-gray-400 w-[10rem] truncate">
                  {item.descricao}
                </span>
              </td>

              <td className="text-md text-gray-900 dark:text-branco   px-2 py-4 whitespace-nowrap">
                {item.cod_verificacao}
              </td>
              <td className="text-md text-gray-900 dark:text-branco   px-2 py-4 whitespace-nowrap">
                {item.prioridade}
              </td>
              <td className="text-md text-gray-900 dark:text-branco px-2 py-4 whitespace-nowrap">
                {moment(item.data).format("DD/MM/YYYY")}
              </td>
              <td
                data-type={item.status_chamado}
                className="text-md first-letter:uppercase data-[type=pendente]:text-red-500 data-[type=andamento]:text-yellow-500 data-[type=concluido]:text-green-500 data-[type=cancelado]:text-red-700  font-bold px-2 py-4  whitespace-nowrap"
              >
                {item.status_chamado}
              </td>

              <td className="text-md text-gray-900 font-light px-2 py-4 whitespace-nowrap ">
                <Dropdown item={item} />
              </td>
            </tr>
          );
        } else {
          return null;
        }
      })
    );
  }

  // Define a quantidade de itens por página
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [paginationButtons, setPaginationButtons] = useState(null);

  function handleChangePage(index) {
    changePage(index);
    setCurrentPage(index);
  }

  function changePage(numberPage) {
    const { from, to } = paginationButtons[numberPage];
    genPagination(from, to);
  }

  function prevPage() {
    if (currentPage - 1 >= 0) {
      changePage(currentPage - 1);
      setCurrentPage(currentPage - 1);
    }
  }

  function nextPage() {
    if (currentPage + 1 < totalPages) {
      changePage(currentPage + 1);
      setCurrentPage(currentPage + 1);
    }
  }

  // Busca todos os chamados aceitos
  async function getChamadoAceito() {
    if (id === null || type === null) {
      return;
    }

    if (type !== "tecnicos") {
      return;
    }

    try {
      const response = await api.get(
        `/chamados?status_chamado=andamento&tecnico_id=${id}`
      );

      setChamadoAceito(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  // Busca todos os chamados
  async function getAllChamados() {
    try {
      switch (type) {
        case "empresas":
          const { data } = await api.get("/chamados?empresa_id=" + id);
          setChamados(data);
          setLoading(false);
          return data;

        case "funcionarios":
          const response = await api.get("/chamados?funcionario_id=" + id);
          setChamados(response.data);
          setLoading(false);
          return response.data;
        case "tecnicos":
          const res = await api.get("/chamados?status_chamado=andamento");
          setChamados(res.data);
          setLoading(false);
          return res.data;
          break;
        default:
          break;
      }
    } catch (error) {
      setStatus("Erro ao buscar seus chamados!");
    }
  }

  // Busca chamados por filtro
  const handleFiltro = async (e) => {
    e.preventDefault();
    const todos = await getAllChamados();
    const andamento = todos.filter(
      (item) => item.status_chamado === "andamento"
    );
    const pendentes = todos.filter(
      (item) => item.status_chamado === "pendente"
    );
    const concluidos = todos.filter(
      (item) => item.status_chamado === "concluido"
    );
    const cancelados = todos.filter(
      (item) => item.status_chamado === "cancelado"
    );

    if (filtro.status_chamado === "pendente") {
      setChamados(pendentes);
      setLoading(false);
    } else if (filtro.status_chamado === "andamento") {
      setChamados(andamento);
      setLoading(false);
    } else if (filtro.status_chamado === "concluido") {
      setChamados(concluidos);
      setLoading(false);
    } else if (filtro.status_chamado === "cancelado") {
      setChamados(cancelados);
      setLoading(false);
    } else {
      setChamados(todos);
      setLoading(false);
    }
  };

  // Busca chamados por filtro pelo protocolo
  const handleFiltroName = async (e) => {
    e.preventDefault();

    const todos = await getAllChamados();
    console.log(type);
    if (type == "funcionarios") {
      const protocolo = todos.filter(
        (chamado) => chamado.cod_verificacao == filtro.empresa
      );
      setChamados(protocolo);
      console.log(chamados);
      setLoading(false);
    } else if (type == "empresas") {
      const nomeFuncionario = todos.filter(
        (chamado) => chamado.protocolo == filtro.nome_funcionario
      );
      setChamados(nomeFuncionario);
      setLoading(false);
    } else if (type == "tecnicos") {
      const nomeEmpresa = todos.filter(
        (chamado) => chamado.protocolo == filtro.nome_empresa
      );
      setChamados(nomeEmpresa);
      setLoading(false);
    }
  };

  // Busca chamados por filtro pela data
  const handleFiltroData = async (e) => {
    e.preventDefault();
    const todos = await getAllChamados();
    const data = todos.filter(
      (item) => item.data.split("T")[0] === filtro.data
    );
    
    setChamados(data);
    setLoading(false);
  };

  // Buscar todos os chamados quando abre a página
  useEffect(() => {
    getChamadoAceito();
    async function getChamados() {
      if (id === null || type === null) {
        return;
      }
      getAllChamados();
    }
    getChamados();
  }, []); // eslint-disable-line

  // Gerar a paginação
  useEffect(() => {
    const totalItems = 8;
    setCurrentPage(0);

    function calcPagination() {
      let pages = Math.ceil(chamados.length / totalItems);
      setTotalPages(pages);
      let buttons = [];

      for (let i = 0; i < pages; i++) {
        buttons.push({ from: i * totalItems, to: (i + 1) * totalItems });
      }

      setPaginationButtons(buttons);
    }

    calcPagination();
    genPagination(0, totalItems);
  }, [chamados]); // eslint-disable-line

  return (
    <>
      <Header />
      <div className="flex flex-col min-h-screen overflow-hidden dark:bg-preto">
        <div className="mt-5 px-11 flex flex-col md:flex-row md:space-x-6">
          <h1 className="text-3xl font-semibold lg:text-3xl lg:m-0 dark:text-branco mx-auto">
            Lista de chamados
          </h1>
          {type == "funcionarios" && (
            <Link
              to="/abrir-chamado"
              className="w-full md:w-40 rounded-md bg-azul-hyde px-3.5 py-1.5 text-center font-semibold leading-7 text-white shadow-sm hover:bg-cyan-600 "
            >
              <span className="flex justify-center items-cente dark:text-branco">
                Abrir chamado
              </span>
            </Link>
          )}
        </div>

        <div className="flex flex-col w-full mt-8 px-11 lg:space-y-0 lg:flex-row gap-4">
          <div className="w-full lg:w-2/4 py-3 flex flex-col gap-4">
            <div className="w-full lg:w--full flex flex-col items-center gap-">
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
                  name="empresa"
                  onChange={changeFiltro}
                  id="empresa"
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
                <label htmlFor="status_chamado" className="dark:text-gray-50 w-full text-start ml-4 cursor-pointer">
                  Filtrar:
                </label>
                <div className="w-full flex flex-1 gap-4 items-center">
                  <select
                    className="focus:outline-none dark:bg-transparent  dark:text-gray-50 focus:border-b-azul-hyde ml-2 border-b-2  w-full p-2"
                    name="status_chamado"
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
                      className="dark:text-branco dark:bg-gray-800 dark:hover:bg-gray-800"
                      value="pendente"
                    >
                      Pendente
                    </option>
                    <option
                      className="dark:text-branco dark:bg-gray-800 dark:hover:bg-gray-800"
                      value="andamento"
                    >
                      Em andamento
                    </option>
                    <option
                      className="dark:text-branco dark:bg-gray-800 dark:hover:bg-gray-100"
                      value="concluido"
                    >
                      Concluido
                    </option>
                    <option
                      className="dark:text-branco dark:bg-gray-800 dark:hover:bg-gray-100"
                      value="cancelado"
                    >
                      Cancelado
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
          <div className="w-ful lg:w-2/4 flex flex-col justify-end py-2.5 gap-3">
            <label htmlFor="data" className="dark:text-white w-full ml-4 cursor-pointer">
              Selecione uma data:
            </label>
            <div className="w-full flex items-center px-4 gap-4">
              <input
                type="date"
                name="data"
                id="data"
                className="bg-transparent dark:text-white text-center dark:border-white border-b-2 flex-1 "
                onChange={(e) => setFiltro({ ...filtro, data: e.target.value })}
              />
              <BiSearchAlt2
                size={20}
                className=" text-gray-400  cursor-pointer"
                onClick={handleFiltroData}
              />
            </div>
          </div>
        </div>

        <div className="mx-5 my-5 p-6 overflow-x-auto overflow-y-hidden">
          <table className="max-w-full w-full min-h-fit rounded-t-md">
            <thead align="start" >
              <tr className="bg-azul-hyde  text-slate-50 text-lg font-bold">
                {type == "tecnicos" && (
                  <th scope="col" className=" py-3 text-lg text-start">
                    Empresa
                  </th>
                )}
                {type == "empresas" && (
                  <th scope="col" className="px-2  py-3 text-lg text-start">
                    Funcionário
                  </th>
                )}

                <th scope="col" className="px-2 py-3 text-lg text-start">
                  Problema
                </th>

                <th scope="col" className="px-2 py-3 text-lg text-start">
                  Protocolo
                </th>
                <th scope="col" className="px-2 py-3 text-lg text-start">
                  Prioridade
                </th>
                <th scope="col" className="px-2 py-3 text-lg text-start">
                  Data de abertura
                </th>
                <th scope="col" className="px-2 py-3 text-lg text-start">
                  Status
                </th>
                <th scope="col" className="px-2 py-3 text-lg text-start"></th>
              </tr>
            </thead>
            <tbody>
              {chamadoAceito.length === 0 ? (
                pagination
              ) : (
                <tr
                  align="center"
                  className="border-b odd:bg-white dark:odd:bg-preto even:bg-slate-100 dark:even:bg-gray-900 font-medium hover:bg-slate-200"
                >
                  {type === "tecnicos" && (
                    <td className="text-lg text-gray-900 dark:text-branco  px-6 py-4 whitespace-nowrap">
                      {chamadoAceito[0].nome_empresa}
                    </td>
                  )}
                  <td className="text-lg text-gray-900 dark:text-branco px-6 py-4 whitespace-nowrap">
                    {chamadoAceito[0].nome_funcionario}
                  </td>
                  <td className="text-lg text-gray-900 dark:text-branco px-6 py-4 whitespace-nowrap">
                    {chamadoAceito[0].problema}
                  </td>
                  <td className="text-lg text-gray-900 dark:text-branco px-6 py-4 whitespace-nowrap">
                    {chamadoAceito[0].cod_verificacao}
                  </td>
                  <td className="text-lg text-gray-900 dark:text-branco px-6 py-4 whitespace-nowrap">
                    {chamadoAceito[0].prioridade}
                  </td>
                  <td
                    data-type={chamadoAceito[0].data}
                    className="text-lg first-letter:uppercase data-[type=pendente]:text-red-500 data-[type=andamento]:text-yellow-500 data-[type=concluido]:text-green-500   font-bold px-6 py-4  whitespace-nowrap"
                  >
                    {chamadoAceito[0].data}
                  </td>
                  <td
                    data-type={chamadoAceito[0].status_chamado}
                    className="text-lg first-letter:uppercase data-[type=pendente]:text-red-500 data-[type=andamento]:text-yellow-500 data-[type=concluido]:text-green-500   font-bold px-6 py-4  whitespace-nowrap"
                  >
                    {chamadoAceito[0].status_chamado}
                  </td>

                  <td className="text-lg text-gray-900 font-light px-6 py-4 whitespace-nowrap ">
                    <Dropdown item={chamadoAceito[0]} />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {loading && (
            <div className="flex gap-2 items-center justify-center m-auto w-64 mt-10">
              <AiOutlineLoading3Quarters
                size={25}
                className="icon dark:text-gray-50"
              />
              <p className="dark:text-gray-50"> Carregando...</p>
            </div>
          )}

          {chamados?.length < 1 && !loading && !status && (
            <div className="flex gap-2 items-center justify-center m-auto w-64 mt-10">
              <p className="dark:text-branco"> Você não possui chamados.</p>
            </div>
          )}
          {status && !loading && (
            <div className="flex gap-2 items-center justify-center m-auto w-64 mt-10">
              <p className="dark:text-branco">{status}</p>
            </div>
          )}
        </div>
        {chamados?.length !== 0 &&
          totalPages !== 1 &&
          chamadoAceito.length === 0 && (
            <div className="flex w-full justify-center mt-10 mb-10">
              <div className="flex rounded-lg justify-center px-2 py-2 shadow-lg w-11/12 md:w-1/2 lg:w-1/3 dark:bg-gray-800">
                <div className="flex align-center justify-center w-12 h-10">
                  <button
                    className="flex item-center justify-center rounded-md item-center h-full w-full text-base font-semibold text-black hover:bg-slate-200 dark:hover:bg-gray-900"
                    onClick={prevPage}
                  >
                    <ChevronLeftIcon
                      className="h-full w-7 dark:text-branco"
                      aria-hidden="true"
                    />
                  </button>
                </div>
                <div className="flex flex-row w-full h-full px-2 justify-evenly">
                  {paginationButtons?.map((button, index) => {
                    if (currentPage < 2) {
                      if (index >= 0 && index < 5) {
                        return (
                          <PaginationButton
                            key={index}
                            currentPage={currentPage}
                            index={index}
                            handleChangePage={(e) => handleChangePage(e)}
                          />
                        );
                      }
                    }

                    if (currentPage > totalPages - 3) {
                      if (index >= totalPages - 5 && index < totalPages) {
                        return (
                          <PaginationButton
                            key={index}
                            currentPage={currentPage}
                            index={index}
                            handleChangePage={(e) => handleChangePage(e)}
                          />
                        );
                      }
                    }

                    if (index >= currentPage - 2 && index < currentPage + 3) {
                      return (
                        <PaginationButton
                          key={index}
                          currentPage={currentPage}
                          index={index}
                          handleChangePage={(e) => handleChangePage(e)}
                        />
                      );
                    }
                  })}
                </div>
                <div className="flex align-center justify-center w-12 h-10">
                  <button
                    className="flex align-center justify-center rounded-md item-center h-full w-full text-base font-semibold text-black hover:bg-slate-200 dark:hover:bg-gray-900"
                    onClick={nextPage}
                  >
                    <ChevronRightIcon
                      className="h-full w-7 dark:text-branco "
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </div>
            </div>
          )}
      </div>
      <Footer />
    </>
  );
}