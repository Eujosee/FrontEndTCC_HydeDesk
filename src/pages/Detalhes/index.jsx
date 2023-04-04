import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./index.css";
import { AiOutlineArrowLeft, AiOutlineConsoleSql } from "react-icons/ai";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import InputMask from "react-input-mask";

export default function Detalhes() {
  const { id } = useParams();
  const [idTecnico, setIdTecnico] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusErro, setStatusErro] = useState("");
  const [user, setUser] = useState([]);
  const [dataChamado, setDataChamado] = useState(null);
  const [adress, setAdress] = useState({
    rua: "",
    estado: "",
    cidade: "",
    bairro: "",
  });

  useEffect(() => {
    async function getDetalhe() {
      try {
        const { data } = await api.get("/chamados/" + id);
        console.log(data);
        setData(data);
        const dataHora = data[0].data.split("T");
        let d = dataHora[0];
        d = d.split("-");
        const dateCall = `${d[2]}/${d[1]}/${d[0]}`;
        setDataChamado(dateCall);
        checkCEP(data[0].cep);
        setLoading(false);
        setIdTecnico(data[0].tecnico_id);
      } catch (error) {
        console.log(error);
      }
    }

    getDetalhe();
  }, [id]);

  async function checkCEP(cep) {
    if (!cep) {
      setAdress({
        rua: "",
        estado: "",
        cidade: "",
        bairro: "",
      });
      return;
    }

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
  }

  useEffect(() => {
    async function getTecnico() {
      if (!idTecnico) return;

      try {
        const { data } = await api.get("/tecnicos/" + idTecnico);
        setUser({ nome_tecnico: data.nome_tecnico, tel: data.telefone });
      } catch (error) {
        console.log(error);
      }
    }

    getTecnico();
  }, [idTecnico]); // eslint-disable-line

  // console.log(user)

  return (
    <>
      <Header />
      {!loading && (
        <div className="flex flex-col w-full h-1/4 p-8 dark:bg-preto">
          <div className="mb-5">
            <AiOutlineArrowLeft
              size={20}
              onClick={() => (window.location.href = "/lista-chamados")}
              className="cursor-pointer text-gray-900 dark:text-branco"
            />
            <div className="flex flex-col mt-5 justify-start md:flex-row md:space-x-5">
              <h1 className="text-xl w-auto">
                <span className="font-bold dark:text-branco">
                  Abertura do chamado:{" "}
                </span>
                <span className="text-gray-500">{dataChamado}</span>
              </h1>
              <div className="flex flex-row items-center justify-start mt-4 lg:mt-0">
                <label className="text-xl font-bold w-auto pr-2 dark:text-branco">
                  Protocolo:
                </label>
                <p className="text-xl text-gray-500 rounded">
                  {data[0].cod_verificacao}
                </p>
              </div>
              <div className="flex flex-row items-center mt-2 lg:mt-0">
                <label className="text-xl font-bold w-auto pr-2 dark:text-branco">
                  Status:
                </label>
                <p
                  data-type={data[0].status_chamado}
                  className="first-letter:uppercase data-[type=pendente]:text-red-500 data-[type=andamento]:text-yellow-500 data-[type=concluido]:text-green-500 rounded  w-1/2 font-semibold text-xl"
                >
                  {data[0].status_chamado}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row w-full lg:space-x-10">
            <div className="flex flex-col w-full lg:w-1/2 mt-5 rounded-lg">
              <h1 className="font-bold text-md mb-6 dark:text-branco">
                Detalhes:
              </h1>
              <div className="grid grid-cols-2 gap-x-5 gap-y-5">
                <div className="flex flex-col">
                  <label className="font-medium text-gray-500">Problema:</label>
                  <input
                    type="text"
                    className="p-2 dark:text-white dark:bg-transparent bg-white dark:border-slate-300  outline-none border-b-2 hover:border-b-azul-hyde"
                    value={data[0].problema}
                    disabled
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-medium">Setor:</label>
                  <input
                    type="text"
                    className="p-2 dark:text-white dark:bg-transparent bg-white dark:border-slate-300  outline-none border-b-2 hover:border-b-azul-hyde"
                    value={data[0].setor}
                    disabled
                  />
                </div>

                <div className="flex flex-col w-full">
                  <label className="font-medium text-gray-500">
                    Patrimonio:
                  </label>
                  <input
                    type="text"
                    className="p-2 dark:text-white dark:bg-transparent bg-white dark:border-slate-300  outline-none border-b-2 hover:border-b-azul-hyde"
                    value={data[0].patrimonio}
                    disabled
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label className="font-medium text-gray-500">
                    Prioridade:
                  </label>
                  <input
                    type="text"
                    className="p-2 dark:text-white dark:bg-transparent bg-white dark:border-slate-300  outline-none border-b-2 hover:border-b-azul-hyde"
                    value={data[0].prioridade}
                    disabled
                  />
                </div>
                <div className="flex flex-col w-full col-span-2">
                  <label className="font-medium text-gray-500">
                    Descrição:
                  </label>
                  <textarea
                    className="p-2 dark:text-white dark:bg-transparent bg-white dark:border-slate-300  outline-none border-b-2 hover:border-b-azul-hyde"
                    value={data[0].descricao}
                    disabled
                  />
                </div>
              </div>
              <label className="font-medium text-gray-500 mt-6">Anexo:</label>
              {data[0].anexo ? (
                <div className="flex flex-col w-full">
                  <img
                    src={
                      "https://hydedesk-api.azurewebsites.net/" + data[0].anexo
                    }
                    className="w-full object-cover"
                    alt="anexo do chamado"
                  />
                </div>
              ) : (
                <input
                  type="text"
                  className="p-2 bg-white "
                  value="Este chamado não possui anexo."
                  disabled
                />
              )}
            </div>
            <div className="flex flex-col w-full lg:w-1/2 sm:w-auto mt-5 rounded-lg">
              <div className="flex flex-col w-full rounded-lg">
                <h1 className="font-bold text-md mb-6 dark:text-branco">
                  Empresa:
                </h1>
                <div className="grid grid-cols-2 gap-x-5 gap-y-5">
                  <div className="flex flex-col">
                    <label className="font-medium text-gray-500">Nome:</label>
                    <input
                      type="text"
                      className="p-2 dark:text-white dark:bg-transparent bg-white dark:border-slate-300  outline-none border-b-2 hover:border-b-azul-hyde"
                      value={data[0].nome_empresa}
                      disabled
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="font-medium text-gray-500">
                      Telefone:
                    </label>
                    <input
                      type="text"
                      className="p-2 dark:text-white dark:bg-transparent  bg-white dark:border-slate-300  outline-none border-b-2 hover:border-b-azul-hyde"
                      value={data[0].telefone}
                      disabled
                    />
                  </div>
                  <div className="col-start-1 col-end-3">
                    <h1 className="font-bold text-md  mb-6 dark:text-branco">
                      Endereço:
                    </h1>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-x-5 gap-y-5">
                  <div className="flex flex-col">
                    <label className=" font-medium text-gray-500">CEP *</label>
                    <InputMask
                      className="p-2 dark:text-white dark:bg-transparent bg-white dark:border-slate-300  outline-none border-b-2 hover:border-b-azul-hyde"
                      placeholder="CEP"
                      name="cep"
                      mask="99999-999"
                      value={data[0].cep}
                      disabled
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="font-medium text-gray-500">Rua</label>
                    <input
                      className="p-2 dark:text-white dark:bg-transparent bg-white dark:border-slate-300  outline-none border-b-2 hover:border-b-azul-hyde"
                      placeholder="Rua"
                      name="Rua"
                      value={adress.rua}
                      disabled
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="font-medium text-gray-500">N°</label>
                    <input
                      className="p-2 dark:text-white dark:bg-transparent bg-white dark:border-slate-300  outline-none border-b-2 hover:border-b-azul-hyde"
                      placeholder="N°"
                      name="numero_endereco"
                      value={data[0].numero_endereco}
                      disabled
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="font-medium text-gray-500">Bairro</label>
                    <input
                      className="p-2 dark:text-white dark:bg-transparent bg-white dark:border-slate-300  outline-none border-b-2 hover:border-b-azul-hyde"
                      placeholder="Bairro"
                      name="bairro"
                      value={adress.bairro}
                      disabled
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="font-medium text-gray-500">Cidade</label>
                    <input
                      className="p-2 dark:text-white dark:bg-transparent bg-white dark:border-slate-300  outline-none border-b-2 hover:border-b-azul-hyde"
                      placeholder="Cidade"
                      name="cidade"
                      value={adress.cidade}
                      disabled
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="font-medium text-gray-500">UF</label>
                    <input
                      className="p-2 dark:text-white dark:bg-transparent bg-white dark:border-slate-300  outline-none border-b-2 hover:border-b-azul-hyde"
                      placeholder="Estado"
                      name="estado"
                      value={adress.estado}
                      disabled
                    />
                  </div>
                </div>
                <div className="flex flex-col w-full mt-6 rounded-lg">
                  <h1 className="font-bold text-md mb-6 dark:text-branco">
                    Informações do técnico:
                  </h1>
                  <div className="grid grid-cols-2 gap-x-5 gap-y-5">
                    <div className="flex flex-col">
                      <label className="font-medium text-gray-500">Nome:</label>
                      <input
                        type="text"
                        className="p-2 dark:text-white dark:bg-transparent bg-white dark:border-slate-300  outline-none border-b-2 hover:border-b-azul-hyde"
                        value={!idTecnico ? "Nenhum" : user.nome_tecnico}
                        disabled
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="font-medium text-gray-500">
                        Telefone:
                      </label>
                      <InputMask
                        className="p-2 dark:text-white dark:bg-transparent bg-white dark:border-slate-300  outline-none border-b-2 hover:border-b-azul-hyde"
                        mask={!idTecnico ? "" : "(99) 99999-9999"}
                        value={!idTecnico ? "Nenhum" : user.tel}
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
