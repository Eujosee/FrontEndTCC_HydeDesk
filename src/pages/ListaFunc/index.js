import Header from "../../components/Header";
import Footer from "../../components/Footer"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import { useEffect, useState } from "react";

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BiSearchAlt2 } from "react-icons/bi";
import api from "../../api";

function ListaFunc() {
  const [funcionarios, setFuncionarios] = useState([]);

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState({
    status_empresa: "",
    nome: "",
  });
  const id = JSON.parse(localStorage.getItem("Id"));

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
    } catch (error) {

    }
  };

  const handleFiltro = async (e) => {
    e.preventDefault();
    try {
      
      if (filtro.nome && filtro.status_empresa) {
        const { data } = await api.get(
          "/funcionarios?status_funcionario=" + filtro.status_empresa +"&nome=" + filtro.nome + "&id_empresa=" + id
        );
        setFuncionarios(data);
      }else
      if(filtro.status_empresa ){
        const { data } = await api.get(
          "/funcionarios?status_funcionario=" + filtro.status_empresa  + "&id_empresa=" + id
        );
        console.log(data)
        setFuncionarios(data);
      }
    } catch (error) {
      setStatus("Erro ao buscar os funcionários!");
    }
  };
  useEffect(() => {
    (async () => {
      try {
        if(id){
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
    <div className="font-Poppins">
      <Header />
      <main>
        <div class="relative px-6 lg:px-8">
          <div class=" max-w-2xl py-5 sm:py-16 lg:py-16">
            <div class="text-center flex flex-row">
              <h1 class="text-2xl font-semi-bold  text-gray-900 sm:text-4xl">
                Funcionários cadastrados
              </h1>

              <div class="ml-6 flex items-center justify-center gap-x-6">
                <a
                  href="cadastro-funcionario"
                  class=" no-underline rounded-md bg-azul-hyde px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-cyan-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
                >
                  Novo
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <section className="response ml-6 sm:ml-0 flex w-full p-4 lg:flex-row ">
        <div className=" pesquisa w-1/3 flex items-center relative">
          <input
            className="focus:outline-none focus:border-b-azul-hyde border-b-2 w-full  p-2"
            placeholder="Nome completo"
            name="nome"
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
              name="status_empresa"
              onChange={changeFiltro}
              required
            >
              <option selected disabled>
                Selecione uma opção
              </option>
              <option value="ativo">Ativo</option>
              <option value="inativo">Inativo</option>
            </select>
          </div>
        </div>
        <button
          className=" botao hover:bg-cyan-600  bg-azul-hyde p-2 rounded-xl text-white font-bold text-lg "
          onClick={handleFiltro}
        >
          Pesquisar
        </button>
      </section>

      <body className="mb-8">
        <div className=" w-auto mr-10 ml-10 ">
          <div class="flex flex-col">
            <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                <div class="overflow-hidden">
                  <table class="min-w-full">
                    <thead align="center" class="border-b-2">
                      <tr>
                        <th
                          scope="col"
                          class="text-lg font-medium text-gray-900 px-6 py-4"
                        >
                          Nome
                        </th>
                        <th
                          scope="col"
                          class="text-lg font-medium text-gray-900 px-6 py-4"
                        >
                          Matrícula
                        </th>
                        <th
                          scope="col"
                          class="text-lg font-medium text-gray-900 px-6 py-4"
                        >
                          Usuário
                        </th>
                        <th
                          scope="col"
                          class="text-lg font-bold text-gray-900 px-6 py-4 "
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          class="text-lg font-medium text-gray-900 px-6 py-4"
                        >
                          Detalhes
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {funcionarios.map((item) => {
                        return (
                          <tr align="center" class="border-b">
                            <td class="text-lg text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              {item.nome}
                            </td>
                            <td class="text-lg text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              {item.matricula}
                            </td>
                            <td class="text-lg text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              {item.usuario}
                            </td>
                            <td class="text-lg text-red-600 font-bold underline px-6 py-4  whitespace-nowrap">
                              {item.status_funcionario}
                            </td>
                            <td class="text-lg text-gray-900 font-light px-6 py-4 whitespace-nowrap space-x-3">
                              <Link to="/">
                                <FontAwesomeIcon icon={faPen} />
                              </Link>
                              <FontAwesomeIcon
                                icon={faTrash}
                                className="cursor-pointer"
                              />
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

                  {funcionarios.length < 1 && !loading && !status && (
                    <div className="flex gap-2 items-center m-auto w-64 mt-10">
                      <p className=""> Você não possui funcionários.</p>
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
        <Footer/>
      </div>
    );
  }


export default ListaFunc;
