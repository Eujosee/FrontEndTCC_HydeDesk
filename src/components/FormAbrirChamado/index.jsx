import { useState } from "react";
import api from "../../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import secureLocalStorage from "react-secure-storage";
import { data } from "autoprefixer";

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

  const changeChamado = (e) => {
    setAbrirChamado({
      ...abrirChamado,
      [e.target.name]: e.target.value,
    });
  };
  
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
        formData.append("anexo", imagem);
        formData.append("funcionario_id", id);

        const { data } = await api.post("/chamados/criar", formData, config);
        toast.success(data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
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
            onChange={changeChamado}
            required
          >
            <option
              className="text-gray-900 dark:text-branco dark:bg-gray-800"
              selected
              disabled
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
              value="Redes"
            >
              Redes
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
            onChange={changeChamado}
            required
          >
            <option
              className="text-gray-900 dark:text-branco dark:bg-gray-800"
              selected
              disabled
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
              value="Media"
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
              onChange={(e) => setImagem(e.target.files[0])}
              accept=".png, .jpg, .jpeg"
              required
            />
            {imagem ? (
              <>
                <img
                  src={URL.createObjectURL(imagem)}
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
