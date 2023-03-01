import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Menu } from "@headlessui/react";
import { useEffect, useState } from "react";
import api from "../../api";
import { BiSearchAlt2 } from "react-icons/bi";
import "./index.css";
import CardAvaliacao from "../../components/CardAvaliacao";

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
    <>
      <Header />
      <div className="flex flex-col h-screen overflow-hidden">
        <div className="mt-5 px-5 flex flex-col md:flex-row md:space-x-6">
          <h1 className="text-3xl font-semibold lg:text-3xl">
            Lista de chamados
          </h1>
          {type == "funcionarios" && (
            <Link
              to="/abrir-chamado"
              className="w-full md:w-40 rounded-md bg-azul-hyde px-3.5 py-1.5 text-center font-semibold leading-7 text-white shadow-sm hover:bg-cyan-600 "
            >
              <span className="flex justify-center items-center">Abrir chamado</span>
            </Link>
          )}
        </div>

        <div className="flex flex-col w-full mt-8 p-5 space-y-4 md:space-y-0 md:flex-row md:space-x-8 ">
          <div className="w-full md:w-1/4 flex items-center relative">
            <label>
              Pesquisar:
            </label>
            <input
              className="focus:outline-none ml-2 focus:border-b-azul-hyde border-b-2 w-full  p-2"
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
          <div className="flex flex-row items-center md:w-1/3">
            <label>
              Filtrar:
            </label>
            <select
              className="focus:outline-none focus:border-b-azul-hyde ml-2 border-b-2 w-full p-2"
              name="status_chamado"
              onChange={changeFiltro}
              required
            >
              <option selected disabled className="text-gray-400">
                Selecione uma opção
              </option>
              <option className="appearence-none" value="pendente">Pendente</option>
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

        <div className="mx-5 overflow-x-auto rounded-t-xl">
          <table className="min-w-full">
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
              {chamados.map((item) => {
                return (
                  <tr
                    align="center"
                    className="border-b odd:bg-white even:bg-slate-100 font-medium hover:bg-slate-200"
                  >
                    {type == "tecnicos" && (
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
                      <Menu
                        as="div"
                        className="relative inline-block text-left"
                      >
                        <div>
                          <Menu.Button>
                            {" "}
                            <FontAwesomeIcon
                              className="text-azul-hyde"
                              icon={faEllipsis}
                            />
                          </Menu.Button>
                        </div>

                        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <div className="py-1">
                            <Menu.Item>
                              <div>
                                <Link
                                  to={"/detalhes/" + item.id_chamado}
                                  className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 font-semibold"
                                >
                                  <button />
                                  Detalhes
                                </Link>
                              </div>
                            </Menu.Item>
                            <Menu.Item>
                              <div>
                                <Link
                                  to={"/"}
                                  className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 font-semibold"
                                >
                                  <button />
                                  Conclusão
                                </Link>
                              </div>
                            </Menu.Item>
                            <Menu.Item>
                              <div>
                                <Link
                                  to={<CardAvaliacao />}
                                  className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 font-semibold"
                                >
                                  <button />
                                  Avaliação
                                </Link>
                              </div>
                            </Menu.Item>
                          </div>
                        </Menu.Items>
                      </Menu>
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
      <Footer  />
    </>
  );
}
export default ListaChamados;
