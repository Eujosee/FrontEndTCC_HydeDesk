import { useState } from "react";
import api from "../../api";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import secureLocalStorage from "react-secure-storage";

function AbrirChamado() {
  const id = JSON.parse(secureLocalStorage.getItem("Id"));
  const [imagem, setImagem] = useState("");
  const [message, setMessage] = useState("")
  const [messageErro, setMessageErro] = useState("")
  const [abrirChamado, setAbrirChamado] = useState({
    problema: "",
    prioridade: "",
    patrimonio: "",
    setor: "",
    descricao: "",
    funcionario_id: id,
  });
  console.log(abrirChamado)

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
    e.preventDefault()
    if(imagem){
      try {
        let formData = new FormData();
        formData.append("prioridade", abrirChamado.prioridade);
        formData.append("patrimonio", abrirChamado.patrimonio);
        formData.append("problema", abrirChamado.problema);
        formData.append("setor", abrirChamado.setor);
        formData.append("descricao", abrirChamado.descricao);
        formData.append("anexo", imagem);
        formData.append("funcionario_id", id);
  
        const { data } = await api.post("/chamados/criar", formData, config)
        toast.success(data.message, {
          position: toast.POSITION.TOP_RIGHT
      });
        setMessage(data)
      } catch (error) {
        toast.success(error, {
          position: toast.POSITION.TOP_RIGHT
      });
        setMessageErro(error)
      }
    }else{
      try {
        const { data } = await api.post("/chamados/criar", abrirChamado)
        toast.success(data.message, {
          position: toast.POSITION.TOP_RIGHT
      });
      } catch (error) {
        toast.success(error, {
          position: toast.POSITION.TOP_RIGHT
      });
      }
    }
  };
  return (
    
    <>
    <ToastContainer/>
      <h1 className="text-center font-bold text-2xl sm:mt-4">
        Abrir um chamado
      </h1>

      <div className="sm:mt-12 sm:flex sm:flex-col lg:grid lg:grid-cols-2 lg:gap-x-10 lg:gap-y-2">
        <div className="">
          <label className="text-lg font-medium text-gray-900">Problema *</label>
          <select
            className="focus:outline-none focus:border-azul-hyde border-b-2 w-full p-2"
            name="problema"

            onChange={changeChamado}

            required
          >
            <option selected disabled>
              Selecione uma opção 
            </option>
            <option value="Hardware">Hardware</option>
            <option value="Redes">Redes</option>
            <option value="Software">Software</option>
          </select>
        </div>

        <div className="">
          <label className="text-lg font-medium text-gray-900">
            Prioridade *
          </label>
          <select
            className="focus:outline-none focus:border-azul-hyde border-b-2 w-full p-2"
            name="prioridade"

            onChange={changeChamado}
            required
          >
            <option selected disabled>
              Selecione uma opção
            </option>
            <option value="Alta">Alta</option>
            <option value="Media">Média</option>
            <option value="Baixa">Baixa</option>
          </select>
        </div>

        <div className="">
          <label className="text-lg font-medium text-gray-900">
            Patrimônio *
          </label>
          <input
            className="focus:outline-none focus:border-azul-hyde border-b-2 w-full p-2"
            placeholder="Informe o patrimônio"
            onChange={changeChamado}
            name="patrimonio"

   
          />
        </div>
        <div className="">
          <label className="text-lg font-medium text-gray-900">Setor *</label>
          <input
            className="focus:outline-none focus:border-azul-hyde border-b-2 w-full p-2"
            placeholder="Informe o setor"
            onChange={changeChamado}
            name="setor"
          />
        </div>
        <div className="grid col-span-2">
          <div className="mt-2 ">
            <label className="text-lg font-medium text-gray-900">

              Descrição

            </label>
            <input
              className="focus:outline-none focus:border-azul-hyde border-b-2 w-full p-2"
              placeholder="Descreva o seu problema"

              onChange={changeChamado}
              name="descricao"

            />
          </div>
          <div className="mt-1 ">
            <div className="flex flex-row">
              <label className="text-lg font-medium text-gray-900">Anexo</label>
              <p
                className="ml-3 mt-1 text-sm text-gray-500 dark:text-gray-300"
                id="file_input_help"
              >
                PNG, JPG ou JPEG.
              </p>
            </div>
            <input
              type="file"
              className="focus:outline-none focus:border-azul-hyde border-b-2 w-full  p-2"
              placeholder="Escolher arquivo"
              name="anexo"
              onChange={(e) => setImagem(e.target.files[0])}
              accept=".png, .jpg, .jpeg"
              required
            />
          </div>
        </div>
      </div>

      <div className=" mt-8 flex justify-center items-center flex-col">
        <button
          className="hover:bg-cyan-600 mb-6 bg-azul-hyde p-2 rounded-3xl text-white font-bold text-lg w-80"
          onClick={handleChamado}
        >
          Enviar
        </button>
        <ToastContainer/>
      </div>
    </>

  );
}

export default AbrirChamado;
