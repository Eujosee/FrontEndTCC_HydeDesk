import api from "../../api"
import { useState } from "react";
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { Link } from "react-router-dom";

function CadFunc () {
    const [status, setStatus] = useState('');
    const [statusErro, setStatusErro] = useState('');
    const id = JSON.parse(localStorage.getItem("Id"));

    const [user,setUser] = useState({
        nome: "",
        id_empresa: id,
        matricula: "",
        usuario: "",
        senha: "",
        confirmsenha: "",
    })


    const handleUser = (e) => {
        setUser({
            ...user,
            [e.target.name]:e.target.value
        })
    }




    const config = {
        headers: { "content-type": "application/json" },
      };
    
    const handleCad = async(e) => {
      try {
        const { data } = await api.post('/funcionarios/cadastro', user, config)
        setStatus(data.message)
      } catch (error) {
        setStatusErro(error.response.data.message)
      }

    }

    return (
        <div className="bg-white px-10 py-4 ">
            <Link className="no-underline text-black" to={'/lista-funcionarios'}>
                <AiOutlineArrowLeft size={20} />
            </Link>
            <h1 className="font-bold text-2xl mt-4">Cadastro de funcionários</h1>
            <div>
                    <div className="mt-2">
                    <label className="text-lg font-medium text-gray-900">Nome completo</label>
                        <input
                            className="border-2 w-full rounded p-2"
                            placeholder= "Nome completo"
                            name="nome"
                            onChange={handleUser}
                            />
                    </div>
                    
                    <div className="mt-2">
                    <label className="text-lg font-medium text-gray-900">Matrícula</label>
                        <input
                            className="border-2 w-full rounded p-2"
                            placeholder= "Matrícula"
                            name="matricula"
                            onChange={handleUser}
                            />
                    </div>
                    <div className="mt-2">
                    <label className="text-lg font-medium text-gray-900">Nome de usuário</label>
                        <input
                            className="border-2 w-full rounded p-2"
                            placeholder= "Usuário"
                            name="usuario"
                            onChange={handleUser}
                            />
                    </div>
                    <div className="mt-2">
                    <label className="text-lg font-medium text-gray-900">Senha</label>
                        <input
                            type="password"
                            className="border-2 w-full rounded p-2"
                            placeholder="Senha"
                            name="senha"
                            onChange={handleUser}
                            />
                    </div>
                    <div className="mt-2">
                    <label className="text-lg font-medium text-gray-900">Confirme sua senha</label>
                        <input
                            type="password"
                            className="border-2 w-full rounded p-2"
                            placeholder="Confirme sua senha"
                            name="confirmsenha"
                            onChange={handleUser}
                            />
                    </div>
                <div className="mt-8 flex flex-col">
                    <p className={status ? "text-green-500" : "text-red-500"}>{status ? status : statusErro}</p>
                    <button className="hover:bg-cyan-600 mb-6 bg-cyan-500 p-2 rounded-3xl text-white font-bold text-lg"
                    onClick={() => handleCad()}
                    >Cadastrar</button>
                </div>
            </div>
        </div>
    );
}

export default CadFunc