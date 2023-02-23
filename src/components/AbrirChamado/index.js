function AbrirChamado() {
  // const [status, setStatus] = useState('');
  // const [statusErro, setStatusErro] = useState('');
  // const [user,setUser] = useState({
  //     problema: "",
  //     prioridade: "",
  //     patrimonio: "",
  //     setor: "",
  //     detalhes: "",
  //     anexo: "",
  // })

  return (
    <div className="">
      <h1 className="text-center font-bold text-2xl sm:mt-4">Abrir um chamado</h1>
      <div className="sm:mt-12 sm:flex sm:flex-col lg:grid lg:grid-cols-2 lg:gap-x-10 lg:gap-y-2">
        <div className="">
          <label className="text-lg font-medium text-gray-900">Problema</label>
          <select
            className="focus:outline-none focus:border-azul-hyde border-b-2 w-full p-2"
            name="problema"
            required
          >
            <option selected disabled>
              Selecione uma opção
            </option>
            <option value="Desenvolvedor">Hardware</option>
            <option value="Infraestrutura">Redes</option>
            <option value="Sistemas operacionais">Software</option>
          </select>
        </div>

        <div className="">
          <label className="text-lg font-medium text-gray-900">
            Prioridade
          </label>
          <select
            className="focus:outline-none focus:border-azul-hyde border-b-2 w-full p-2"
            name="prioridade"
            required
          >
            <option selected disabled>
              Selecione uma opção
            </option>
            <option value="Desenvolvedor">Alta</option>
            <option value="Infraestrutura">Média</option>
            <option value="Sistemas operacionais">Baixa</option>
          </select>
        </div>

        <div className="">
          <label className="text-lg font-medium text-gray-900">
            Patrimônio
          </label>
          <input
            className="focus:outline-none focus:border-azul-hyde border-b-2 w-full p-2"
            placeholder="Informe o patrimônio"
            name="patrimonio"
          />
        </div>
        <div className="">
          <label className="text-lg font-medium text-gray-900">Setor</label>
          <input
            className="focus:outline-none focus:border-azul-hyde border-b-2 w-full p-2"
            placeholder="Informe o setor"
            name="setor"
          />
        </div>
        <div className="grid col-span-2">
          <div className="mt-2 ">
            <label className="text-lg font-medium text-gray-900">
              Detalhes
            </label>
            <input
              className="focus:outline-none focus:border-azul-hyde border-b-2 w-full p-2"
              placeholder="Descreva o seu problema"
              name="detalhes"
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
              required
            />
          </div>
        </div>
      </div>
        <div className=" mt-8 flex justify-center items-center flex-col">
          <button className="hover:bg-cyan-600 mb-6 bg-azul-hyde p-2 rounded-3xl text-white font-bold text-lg w-80">
            Enviar
          </button>
        </div>
    </div>
  );
}

export default AbrirChamado;
