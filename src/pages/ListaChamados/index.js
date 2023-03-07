import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api";
import { BiSearchAlt2 } from "react-icons/bi";
import "./index.css";
import Dropdown from "../../components/Dropdown";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/20/solid";
import PaginationButton from "../../components/PaginationButton";

function ListaChamados() {
  const [chamados, setChamados] = useState([]);
  const [chamadoAceito, setChamadoAceito] = useState([]);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  const [filtro, setFiltro] = useState({
    status_chamado: "",
    empresa: "",
  });
  const type = JSON.parse(localStorage.getItem("Tipo"));
  const id = JSON.parse(localStorage.getItem("Id"));

  const changeFiltro = (e) => {
    setFiltro({
      ...filtro,
      [e.target.name]: e.target.value,
    });
  };

  const [pagination, setPagination] = useState(null);

  function genPagination(from, to) {
    setPagination(
      chamados.map((item, index) => {
        if (index >= from && index < to) {
          return (
            <tr
              key={item.id_chamado}
              align="center"
              className="border-b odd:bg-white even:bg-slate-100 font-medium hover:bg-slate-200"
            >
              {type === "tecnicos" && (
                <td className="text-lg text-gray-900  px-6 py-4 whitespace-nowrap">
                  {item.nome_empresa}
                </td>
              )}
              <td className="text-lg text-gray-900 px-6 py-4 whitespace-nowrap">
                {item.nome_funcionario}
              </td>
              <td className="text-lg text-gray-900 px-6 py-4 whitespace-nowrap">
                {item.problema}
              </td>
              <td className="text-lg text-gray-900 px-6 py-4 whitespace-nowrap">
                {item.cod_verificacao}
              </td>
              <td className="text-lg text-gray-900 px-6 py-4 whitespace-nowrap">
                {item.prioridade}
              </td>
              <td
                data-type={item.status_chamado}
                className="text-lg first-letter:uppercase data-[type=pendente]:text-red-500 data-[type=andamento]:text-yellow-500 data-[type=concluido]:text-green-500   font-bold px-6 py-4  whitespace-nowrap"
              >
                {item.status_chamado}
              </td>

              <td className="text-lg text-gray-900 font-light px-6 py-4 whitespace-nowrap ">
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

  async function getChamadoAceito() {
    try {
      const tecnico_id = localStorage.getItem("Id");
      const response = await api.get(
        `/chamados?status_chamado=andamento&tecnico_id=${tecnico_id}`
      );

      setChamadoAceito(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleFiltro = async (e) => {
    e.preventDefault();
    try {
      if (filtro.status_chamado !== "") {
        switch (type) {
          case "empresas":
            if (filtro.empresa && filtro.status_chamado) {
              const { data } = await api.get(
                "/chamados?empresa_id=" +
                  id +
                  "&status_chamado=" +
                  filtro.status_chamado +
                  "&nome_funcionario=" +
                  filtro.empresa
              );
              setChamados(data);
              setLoading(false);
            } else {
              const { data } = await api.get(
                "/chamados?empresa_id=" +
                  id +
                  "&status_chamado=" +
                  filtro.status_chamado
              );
              setChamados(data);
              setLoading(false);
            }
            break;
          case "funcionarios":
            if (filtro.empresa && filtro.status_chamado) {
              const response = await api.get(
                "/chamados?funcionario_id=" +
                  id +
                  "&status_chamado=" +
                  filtro.status_chamado +
                  "&cod_verificacao=" +
                  filtro.empresa
              );
              console.log(response.data);
              setChamados(response.data);
              setLoading(false);
            } else {
              const response = await api.get(
                "/chamados?funcionario_id=" +
                  id +
                  "&status_chamado=" +
                  filtro.status_chamado
              );
              console.log(response.data);
              setChamados(response.data);
              setLoading(false);
            }
            break;
          case "tecnicos":
            if (filtro.empresa && filtro.status_chamado) {
              const res = await api.get(
                "/chamados?status_chamado=" +
                  filtro.status_chamado +
                  "&nome_empresa=" +
                  filtro.empresa
              );
              setChamados(res.data);
              setLoading(false);
            } else {
              const res = await api.get(
                "/chamados?status_chamado=" + filtro.status_chamado
              );
              setChamados(res.data);
              setLoading(false);
            }
            break;
          default:
            break;
        }
      }
    } catch (error) {}
  };

  const handleFiltroName = async (e) => {
    e.preventDefault();
    try {
      if (filtro.empresa !== "") {
        if (type == "tecnicos") {
          const { data } = await api.get(
            "/chamados?nome_empresa=" + filtro.empresa + "&empresa_id=" + id
          );
          setChamados(data);
        } else if (type == "empresas") {
          const { data } = await api.get(
            "/chamados?nome_funcionario=" + filtro.empresa + "&empresa_id=" + id
          );
          setChamados(data);
        } else if (type == "funcionarios") {
          const { data } = await api.get(
            "/chamados?cod_verificacao=" + filtro.empresa + "&empresa_id=" + id
          );
          setChamados(data);
        }
      }
    } catch (error) {}
  };
  useEffect(() => {
    getChamadoAceito();
    (async () => {
      try {
        switch (type) {
          case "empresas":
            const { data } = await api.get("/chamados?empresa_id=" + id);

            setChamados(data);
            setLoading(false);
            break;
          case "funcionarios":
            const response = await api.get("/chamados?funcionario_id=" + id);
            console.log(response.data);
            setChamados(response.data);
            setLoading(false);
            break;
          case "tecnicos":
            const res = await api.get("/chamados");
            setChamados(res.data);
            setLoading(false);
            break;
          default:
            break;
        }
      } catch (error) {
        setStatus("Erro ao buscar seus chamados!");
      }
    })();
  }, [id, type]);

  useEffect(() => {
    const totalItems = 8;
    setCurrentPage(0);

    function calcPagination() {
      let pages = Math.round(chamados.length / totalItems);
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
      <div className="flex flex-col min-h-screen overflow-hidden">
        <div className="mt-5 px-5 flex flex-col md:flex-row md:space-x-6">
          <h1 className="text-3xl font-semibold lg:text-3xl">
            Lista de chamados
          </h1>
          {type == "funcionarios" && (
            <Link
              to="/abrir-chamado"
              className="w-full md:w-40 rounded-md bg-azul-hyde px-3.5 py-1.5 text-center font-semibold leading-7 text-white shadow-sm hover:bg-cyan-600 "
            >
              <span className="flex justify-center items-center">
                Abrir chamado
              </span>
            </Link>
          )}
        </div>

        <div className="flex flex-col w-full mt-8 p-5 space-y-4 lg:space-y-0 lg:flex-row lg:space-x-8">
          <div className="w-full lg:w-1/3 flex items-center relative">
            <label>Pesquisar:</label>
            <input
              className="focus:outline-none ml-2 focus:border-b-azul-hyde border-b-2 w-full p-2"
              placeholder={
                type == "tecnicos"
                  ? "Nome da empresa"
                  : type == "empresas"
                  ? "Nome do funcionário"
                  : "Protocolo"
              }
              name="empresa"
              onChange={changeFiltro}
              required
            />
            <BiSearchAlt2
              size={20}
              className="absolute text-gray-400 right-3 cursor-pointer"
              onClick={handleFiltroName}
            />
          </div>
          <div className="flex flex-row items-center lg:w-1/3">
            <label>Filtrar:</label>
            <select
              className="focus:outline-none focus:border-b-azul-hyde ml-2 border-b-2 w-full p-2"
              name="status_chamado"
              onChange={changeFiltro}
              required
            >
              <option selected disabled>
                Selecione uma opção
              </option>
              <option value="pendente">Pendente</option>
              <option value="andamento">Em andamento</option>
              <option value="concluido">Concluido</option>
            </select>
          </div>
          <button
            className="rounded-md bg-azul-hyde px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-cyan-600 "
            onClick={handleFiltro}
          >
            Pesquisar
          </button>
        </div>

        <div className="mx-5 overflow-x-auto overflow-y-hidden rounded-t-xl">
          <table className="min-w-full min-h-fit">
            <thead align="center">
              <tr className="bg-azul-hyde text-slate-50 text-lg font-bold">
                {type == "tecnicos" && (
                  <th scope="col" className="px-6 py-4">
                    Empresa
                  </th>
                )}
                <th scope="col" className="px-6 py-4">
                  Funcionário
                </th>

                <th scope="col" className="px-6 py-4">
                  Problema
                </th>
                <th scope="col" className="px-6 py-4">
                  Protocolo
                </th>
                <th scope="col" className="px-6 py-4">
                  Prioridade
                </th>
                <th scope="col" className="px-6 py-4">
                  Status
                </th>
                <th scope="col" className="px-6 py-4">
                  Opções
                </th>
              </tr>
            </thead>
            <tbody>
              {chamadoAceito.length === 0 ? (
                pagination
              ) : (
                <tr
                  align="center"
                  className="border-b odd:bg-white even:bg-slate-100 font-medium hover:bg-slate-200"
                >
                  {type === "tecnicos" && (
                    <td className="text-lg text-gray-900  px-6 py-4 whitespace-nowrap">
                      {chamadoAceito[0].nome_empresa}
                    </td>
                  )}
                  <td className="text-lg text-gray-900 px-6 py-4 whitespace-nowrap">
                    {chamadoAceito[0].nome_funcionario}
                  </td>
                  <td className="text-lg text-gray-900 px-6 py-4 whitespace-nowrap">
                    {chamadoAceito[0].problema}
                  </td>
                  <td className="text-lg text-gray-900 px-6 py-4 whitespace-nowrap">
                    {chamadoAceito[0].cod_verificacao}
                  </td>
                  <td className="text-lg text-gray-900 px-6 py-4 whitespace-nowrap">
                    {chamadoAceito[0].prioridade}
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
              <AiOutlineLoading3Quarters size={25} className="icon" />
              <p className=""> Carregando...</p>
            </div>
          )}

          {chamados.length < 1 && !loading && !status && (
            <div className="flex gap-2 items-center justify-center m-auto w-64 mt-10">
              <p className=""> Você não possui chamados.</p>
            </div>
          )}
          {status && !loading && (
            <div className="flex gap-2 items-center justify-center m-auto w-64 mt-10">
              <p className="">{status}</p>
            </div>
          )}
        </div>
        {chamados?.length !== 0 &&
          totalPages !== 1 &&
          chamadoAceito.length === 0 && (
            <div className="flex w-full justify-center mt-10 mb-10">
              <div className="flex rounded-lg justify-center px-2 py-2 shadow-lg w-11/12 md:w-1/2 lg:w-1/3">
                <div className="flex align-center justify-center w-12 h-10">
                  <button
                    className="flex item-center justify-center rounded-md item-center h-full w-full text-base font-semibold text-black hover:bg-slate-200"
                    onClick={prevPage}
                  >
                    <ChevronLeftIcon
                      className="h-full w-7"
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
                    className="flex align-center justify-center rounded-md item-center h-full w-full text-base font-semibold text-black hover:bg-slate-200"
                    onClick={nextPage}
                  >
                    <ChevronRightIcon
                      className="h-full w-7"
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
export default ListaChamados;
