import api from "../../api";
import { useState } from "react";

function AbrirChamado() {
  const [status, setStatus] = useState('');
  const [statusErro, setStatusErro] = useState('');
  const [imagem, setImagem] = useState('');
  const id = JSON.parse(localStorage.getItem("Id"));
  const [user,setUser] = useState({
      problema: "",
      prioridade: "",
      patrimonio: "",
      setor: "",
      descricao: "",
  })

  console.log(user)

  const resetForm = () => {
    setUser({
      problema: "",
      prioridade: "",
      patrimonio: "",
      setor: "",
      descricao: "",
    })
  }

  const handleUser = (e) => {
    setUser({
      ...user,
      [e.target.name]:e.target.value
    })
  }

  const config = {
    headers: { "content-type": "multipart/form-data"},
  };

  const handleReq = async(e) => {
    e.preventDefault()
    try {
      let formData = new FormData()
      formData.append("problema", user.problema)
      formData.append("prioridade", user.prioridade)
      formData.append("patrimonio", user.patrimonio)
      formData.append("setor", user.setor)
      formData.append("descricao", user.descricao)
      formData.append("anexo", imagem)
      formData.append("funcionario_id", id)

      const { data } = await api.post('/chamados/criar', formData, config)
      setStatus(data.message)
      resetForm()
    } catch (error) {
      console.log(error)
      setStatusErro(error.response.data.message)
    }
  }

  return (
    <>
      <h1 className="text-center font-bold text-2xl sm:mt-4">Abrir um chamado</h1>
      <form encType="multipart/form">
      <div className="sm:mt-12 sm:flex sm:flex-col lg:grid lg:grid-cols-2 lg:gap-x-10 lg:gap-y-2">
        <div className="">
          <label className="text-lg font-medium text-gray-900">Problema *</label>
          <select
            className="focus:outline-none focus:border-azul-hyde border-b-2 w-full p-2"
            name="problema"
            onChange={(e) => [handleUser(e), setStatusErro('')]}
            value={user.problema}
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
            onChange={(e) => [handleUser(e), setStatusErro('')]}
            value={user.prioridade}
            required
          >
            <option selected disabled>
              Selecione uma opção
            </option>
            <option value="Alta">Alta</option>
            <option value="Média">Média</option>
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
            name="patrimonio"
            value={user.patrimonio}
            onChange={(e) => [handleUser(e), setStatusErro('')]}
          />
        </div>
        <div className="">
          <label className="text-lg font-medium text-gray-900">Setor *</label>
          <input
            className="focus:outline-none focus:border-azul-hyde border-b-2 w-full p-2"
            placeholder="Informe o setor"
            name="setor"
            value={user.setor}
            onChange={(e) => [handleUser(e), setStatusErro('')]}
          />
        </div>
        <div className="grid col-span-2">
          <div className="mt-2 ">
            <label className="text-lg font-medium text-gray-900">
              Detalhes *
            </label>
            <input
              className="focus:outline-none focus:border-azul-hyde border-b-2 w-full p-2"
              placeholder="Descreva o seu problema"
              name="descricao"
              value={user.descricao}
              onChange={(e) => [handleUser(e), setStatusErro('')]}
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
              accept=".png, .jpg, .jpeg"
              onChange={(e) => setImagem(e.target.files[0])}
              required
            />
          </div>
        </div>
      </div>
        <div className=" mt-8 flex justify-center items-center flex-col">
          <button type="submit" className="hover:bg-cyan-600 mb-6 bg-azul-hyde p-2 rounded-3xl text-white font-bold text-lg w-80"
          onClick={handleReq}>Enviar</button>
           <p className={status ? "text-green-500" : "text-red-500"}>{status ? status : statusErro}</p>
        </div>
      </form>
    </>
  );
}

export default AbrirChamado;
