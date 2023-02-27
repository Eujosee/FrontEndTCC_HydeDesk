import Header from "../../components/header";
import Footer from "../../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api";
import { BiSearchAlt2 } from "react-icons/bi";
import "./index.css";

function ListaChamados() {
  const [chamados, setChamados] = useState([]);
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
                  "&protocolo=" +
                  filtro.empresa
              );
              setChamados(response.data);
              setLoading(false);
            } else {
              const response = await api.get(
                "/chamados?funcionario_id=" +
                  id +
                  "&status_chamado=" +
                  filtro.status_chamado
              );
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
        } else {
          const { data } = await api.get(
            "/chamados?nome_funcionario=" + filtro.empresa + "&empresa_id=" + id
          );
          setChamados(data);
        }
      }
    } catch (error) {}
  };

  useEffect(() => {
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

  return (
    <div className="font-Poppins teste">
      <Header />

      <main>
        <div className="relative px-6 lg:px-8">
          <div className="max-w-2xl py-5 :py-16 lg:py-16">
            <div className="text-center flex flex-row">
              <h1 className=" texto text-2xl ml-6 first-letter:font-semibold sm:ml-0 text-gray-900 sm:text-4xl">
                Lista de chamados
              </h1>
              {type !== "empresas" && (
                <div className="ml-6 flex items-center justify-center gap-x-6">
                  <Link
                    to="/abrir-chamado"
                    className=" no-underline rounded-md bg-azul-hyde px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-cyan-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
                  >
                    Novo chamado
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <section className="response ml-6 sm:ml-0 flex w-full p-4 lg:flex-row ">
        <div className=" pesquisa w-1/3 flex items-center relative">
          <input
            className="focus:outline-none focus:border-b-azul-hyde border-b-2 w-full  p-2"
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
            className="absolute right-3 cursor-pointer"
            onClick={handleFiltroName}
          />
        </div>
        <div className="filtro w-1/4 ml-4  flex items-center mr-8">
          <div className="w-full">
            <select
              className="focus:outline-none focus:border-b-azul-hyde border-b-2 w-full p-2"
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
        </div>
        <button
          className=" botao hover:bg-cyan-600  bg-azul-hyde p-2 rounded-xl text-white font-bold text-lg"
          onClick={handleFiltro}
        >
          Pesquisar
        </button>
      </section>

      <body className="h-screen">
        <div className=" w-full  sm:ml-0 sm:mr-0">
          <div className="flex  flex-col ">
            <div className="overflow-x-auto  lg:-mx-8">
              <div className="py-8 inline-block min-w-full sm:px-2 lg:px-">
                <div className="overflow-hidden">
                  <table className="w-full">
                    <thead align="center" className="border-b-2 w-full">
                      <tr>
                        {type == "tecnicos" && (
                          <th
                            scope="col"
                            className="text-lg font-bold text-gray-900 px-6 py-4"
                          >
                            Nome da empresa
                          </th>
                        )}
                        <th
                          scope="col"
                          className="text-lg font-bold text-gray-900 px-6 py-4"
                        >
                          Nome do funcionário
                        </th>

                        <th
                          scope="col"
                          className="text-lg font-bold text-gray-900 px-6 py-4 "
                        >
                          Problema
                        </th>
                        <th
                          scope="col"
                          className="text-lg font-bold text-gray-900 px-6 py-4"
                        >
                          Protocolo
                        </th>
                        <th
                          scope="col"
                          className="text-lg font-bold text-gray-900 px-6 py-4 "
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="text-lg font-bold px-6 py-4 "
                        >
                          Detalhes
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {chamados.map((item, index) => {
                        return (
                          <tr
                            align="center"
                            className="border-b"
                            key={item.id_chamad}
                          >
                            {type == "tecnicos" && (
                              <td className="text-lg text-gray-900 font-light px-4 py-4 whitespace-nowrap">
                                {item.nome_empresa}
                              </td>
                            )}
                            <td className="text-lg text-gray-900 font-light px-4 py-4 whitespace-nowrap">
                              {item.nome_funcionario}
                            </td>

                            <td className="text-lg text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              {item.problema}
                            </td>
                            <td className="text-lg text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              {item.cod_verificacao}
                            </td>
                            <td className="text-lg text-red-600 font-bold underline px-6 py-4  whitespace-nowrap">
                              {item.status_chamado}
                            </td>
                            <td className="text-lg text-gray-900 font-light px-6 py-4 whitespace-nowrap space-x-3">
                              <Link
                                to={"/detalhes/" + item.id_chamado}
                                className="text-azul-hyde"
                              >
                                <FontAwesomeIcon icon={faEye} />
                              </Link>
                              <FontAwesomeIcon
                                icon={faTrash}
                                className="cursor-pointer"
                              />
                              <a href="/" className="text-azul-hyde">
                                <FontAwesomeIcon icon={faEllipsis} />
                              </a>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  {loading && (
                    <div className="flex gap-2 items-center m-auto w-64 mt-10">
                      <AiOutlineLoading3Quarters size={25} className="icon" />
                      <p className=""> Carregando...</p>
                    </div>
                  )}

                  {chamados.length < 1 && !loading && !status && (
                    <div className="flex gap-2 items-center m-auto w-64 mt-10">
                      <p className=""> Você não possui chamados.</p>
                    </div>
                  )}
                  {status && !loading && (
                    <div className="flex gap-2 items-center m-auto w-64 mt-10">
                      <p className="">{status}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
      <Footer />
    </div>
  );
}
export default ListaChamados;