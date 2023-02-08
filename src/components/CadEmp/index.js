import api from "../../api"
import { Link } from "react-router-dom";
import { useState } from "react";

function CadEmp () {
    const [status, setStatus] = useState('');
    const [statusErro, setStatusErro] = useState('');
    const [user,setUser] = useState({
        nome: "",
        cnpj: "",
        email: "",
        telefone: "",
        cep: "",
        numero_endereco: "",
        senha: "",
        confirmarsenha: "",
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
            const { data } = await api.post('/empresas/cadastro', user, config)
            setStatus(data.message)
        } catch (error) {
            setStatusErro(error.response.data.message);
        }


    }

    return (
        <div className="bg-white px-10 py-10 rounded">
            <h1 className="font-bold text-2xl">Cadastro para empresas</h1>
            <div>
                    <div className="mt-8">
                    <label className="text-lg font-medium text-gray-900">Nome da empresa</label>
                        <input
                            className="border-2 w-full rounded p-2"
                            placeholder= "Nome da empresa"
                            name="nome"
                            onChange={handleUser}
                            />
                    </div>
                    <div className="mt-2">
                    <label className="text-lg font-medium text-gray-900">CNPJ</label>
                        <input
                            className="border-2 w-full rounded p-2"
                            placeholder= "CNPJ"
                            name="cnpj"
                            onChange={handleUser}
                            />
                    </div>
                    <div className="mt-2">
                    <label className="text-lg font-medium text-gray-900">Email</label>
                        <input
                            type="email"
                            className="border-2 w-full rounded p-2"
                            placeholder= "Email"
                            name="email"
                            onChange={handleUser}
                            />
                    </div>
                    <div className="mt-2">
                    <label className="text-lg font-medium text-gray-900">Telefone</label>
                        <input
                            className="border-2 w-full rounded p-2"
                            placeholder= "Telefone"
                            name="telefone"
                            onChange={handleUser}
                            />
                    </div>
                    <div className="mt-2">
                    <label className="text-lg font-medium text-gray-900">CEP</label>
                        <input
                            className="border-2 w-full rounded p-2"
                            placeholder= "CEP"
                            name="cep"
                            onChange={handleUser}
                            />
                    </div>
                    <div className="mt-2">
                    <label className="text-lg font-medium text-gray-900">Endereço completo</label>
                        <input
                            className="border-2 w-full rounded p-2"
                            placeholder= "Endereço Completo"
                            name="numero_endereco"
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
                            name="confirmarsenha"
                            onChange={handleUser}
                            />
                    </div>
                <div className="mt-8 flex flex-col">
                    <button className="hover:bg-cyan-600 mb-6 bg-cyan-500 p-2 rounded-3xl text-white font-bold text-lg"
                    onClick={() => handleCad()}
                    >Cadastre-se</button>
                     <p className={status ? "text-green-500" : "text-red-500"}>{status ? status : statusErro}</p>
                </div>
                <div>
                    <Link className="no-underline flex items-center " to='/login'>
                        <p className="text-black font-medium mb-1">Já possui uma conta?</p>
                        <p className="ml-2 text-cyan-500 font-medium mb-1">Login</p>
                    </Link>                                   
                </div>
            </div>
        </div>
    );
}

export default CadEmp