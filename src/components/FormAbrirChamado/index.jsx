import { useState } from "react";
import api from "../../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import secureLocalStorage from "react-secure-storage";

export default function FormAbrirChamado() {
  const id = JSON.parse(secureLocalStorage.getItem("Id"));
  const [imagem, setImagem] = useState("");
  const [abrirChamado, setAbrirChamado] = useState({
    problema: "",
    prioridade: "",
    patrimonio: "",
    setor: "",
    descricao: "",
    funcionario_id: id,
  });

  // resetar o formulario após o envio dos dados
  const resetForm = () => {
    setAbrirChamado({
      problema: "",
      prioridade: "",
      patrimonio: "",
      setor: "",
      descricao: "",
      funcionario_id: id,
    })
    setImagem("")
  }

  console.log(imagem)
  // salvar os dados na const abrirChamado
  const changeChamado = (e) => {
    setAbrirChamado({
      ...abrirChamado,
      [e.target.name]: e.target.value,
    });
  };
  
  // configuração do headers da api
  const config = {
    headers: { "content-type": "multipart/form-data" },
  };

  const handleChamado = async (e) => {
    e.preventDefault();
    if (imagem) {
      try {
        let formData = new FormData();
        formData.append("prioridade", abrirChamado.prioridade);
        formData.append("patrimonio", abrirChamado.patrimonio);
        formData.append("problema", abrirChamado.problema);
        formData.append("setor", abrirChamado.setor);
        formData.append("descricao", abrirChamado.descricao);
        formData.append("anexo", imagem[0]);
        formData.append("funcionario_id", id);

        const { data } = await api.post("/chamados/criar", formData, config);
        toast.success(data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        resetForm()
      } catch (error) {
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } else {
      try {
        const { data } = await api.post("/chamados/criar", abrirChamado);
        toast.success(data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        resetForm()
      } catch (error) {
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <h1 className="text-center text-gray-900 font-bold text-2xl sm:mt-4 dark:text-branco">
        Abrir um chamado
      </h1>

      <div className="mt-0 flex flex-col p-6 gap-y-5 lg:mt-12 lg:grid lg:grid-cols-2 lg:gap-x-10 lg:gap-y-2">
        <div>
          <label className="text-lg font-medium text-gray-900 dark:text-branco">
            Problema *
          </label>
          <select
            className="focus:outline-none focus:border-azul-hyde border-b-2 w-full p-2 dark:bg-transparent"
            name="problema"
            value={abrirChamado.problema}
            onChange={changeChamado}
            required
          >
            <option
              className="text-gray-900 dark:text-branco dark:bg-gray-800"
              selected
              value=""
            >
              Selecione uma opção
            </option>
            <option
              className="text-gray-900 dark:text-branco dark:bg-gray-800"
              value="Hardware"
            >
              Hardware
            </option>
            <option
              className="text-gray-900 dark:text-branco dark:bg-gray-800"
              value="Infraestrutura"
            >
              Infraestrutura
            </option>
            <option
              className="text-gray-900 dark:text-branco dark:bg-gray-800"
              value="Software"
            >
              Software
            </option>
          </select>
        </div>

        <div>
          <label className="text-lg font-medium text-gray-900  dark:text-branco">
            Prioridade *
          </label>
          <select
            className="focus:outline-none focus:border-azul-hyde border-b-2 w-full p-2 dark:bg-transparent"
            name="prioridade"
            value={abrirChamado.prioridade}
            onChange={changeChamado}
            required
          >
            <option
              className="text-gray-900 dark:text-branco dark:bg-gray-800"
              selected
              value=""
            >
              Selecione uma opção
            </option>
            <option
              className="text-gray-900 dark:text-branco dark:bg-gray-800"
              value="Alta"
            >
              Alta
            </option>
            <option
              className="text-gray-900 dark:text-branco dark:bg-gray-800"
              value="Média"
            >
              Média
            </option>
            <option
              className="text-gray-900 dark:text-branco dark:bg-gray-800"
              value="Baixa"
            >
              Baixa
            </option>
          </select>
        </div>

        <div>
          <label className="text-lg font-medium text-gray-900 dark:text-branco">
            Patrimônio *
          </label>
          <input
            className="focus:outline-none focus:border-azul-hyde border-b-2 w-full p-2 dark:bg-transparent"
            placeholder="Informe o patrimônio"
            value={abrirChamado.patrimonio}
            onChange={changeChamado}
            name="patrimonio"
          />
        </div>
        <div>
          <label className="text-lg font-medium text-gray-900 dark:text-branco">
            Setor *
          </label>
          <input
            className="focus:outline-none focus:border-azul-hyde border-b-2 w-full p-2 dark:bg-transparent"
            placeholder="Informe o setor"
            value={abrirChamado.setor}
            onChange={changeChamado}
            name="setor"
          />
        </div>
        <div className="grid col-span-2">
          <div>
            <label className="text-lg font-medium text-gray-900 dark:text-branco">
              Descrição
            </label>
            <input
              className="focus:outline-none focus:border-azul-hyde border-b-2 w-full p-2 dark:bg-transparent"
              placeholder="Descreva o seu problema"
              value={abrirChamado.descricao}
              onChange={changeChamado}
              name="descricao"
            />
          </div>
          <div className="mt-6 md:mt-1 ">
            <div className="flex flex-row">
              <label className="text-lg font-medium text-gray-900 dark:text-branco">
                Anexo
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
              className="focus:outline-none focus:border-azul-hyde border-b-2 w-full  p-2 mb-2 dark:bg-transparent"
              placeholder="Escolher arquivo"
              name="anexo"
              value=""
              onChange={(e) => setImagem(e.target.files)}
              accept=".png, .jpg, .jpeg"
            />
            {imagem ? (
              <>
                <img
                  src={URL.createObjectURL(imagem[0])}
                  alt="Foto de anexo"
                  className="w-56 h-56"
                />
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>

      <div className=" mt-8 flex justify-center items-center flex-col">
        <button
          className="hover:bg-cyan-600 mb-6 bg-azul-hyde p-2 rounded-md text-white font-bold text-lg w-80"
          onClick={handleChamado}
        >
          Enviar
        </button>
      </div>
    </>
  );
}
