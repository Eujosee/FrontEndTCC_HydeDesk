import api from "../../api"
import { Link } from "react-router-dom";
import { useState } from "react";
import Imagemcad from "../../images/mobile.svg"

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
        <div className="bg-white px-10 pb-10 pt-3">
                    <div className="flex flex-col justify-center items-center mt-5">
                        <label className="text-lg font-medium text-gray-900">Foto de perfil</label>
                        <img className="w-40 rounded-full" src={Imagemcad} />
                    </div>
            <div className="sm:flex sm:flex-col lg:grid lg:grid-cols-2 lg:gap-x-10 lg:gap-y-2">
                    <div className="mt-2">
                    <label className="text-lg font-medium text-gray-900">Nome da empresa *</label>
                        <input
                            className="focus:outline-none focus:border-azul-hyde border-b-2 w-full p-2"
                            placeholder= "Nome da empresa"
                            name="nome"
                            onChange={handleUser}
                            />
                    </div>
                    <div className="mt-2">
                    <label className="text-lg font-medium text-gray-900">CNPJ *</label>
                        <input
                            className="focus:outline-none focus:border-azul-hyde border-b-2 w-full p-2"
                            placeholder= "CNPJ"
                            name="cnpj"
                            onChange={handleUser}
                            />
                    </div>
                    <div className="mt-2">
                    <label className="text-lg font-medium text-gray-900">Email *</label>
                        <input
                            type="email"
                            className="focus:outline-none focus:border-azul-hyde border-b-2 w-full p-2"
                            placeholder= "Email"
                            name="email"
                            onChange={handleUser}
                            />
                    </div>
                    <div className="mt-2">
                    <label className="text-lg font-medium text-gray-900">Telefone *</label>
                        <input
                            className="focus:outline-none focus:border-azul-hyde border-b-2 w-full p-2"
                            placeholder= "Telefone"
                            name="telefone"
                            onChange={handleUser}
                            />
                    </div>
                    <div className="mt-2">
                    <label className="text-lg font-medium text-gray-900">CEP *</label>
                        <input
                            className="focus:outline-none focus:border-azul-hyde border-b-2 w-full p-2"
                            placeholder= "CEP"
                            name="cep"
                            onChange={handleUser}
                            />
                    </div>
                    <div className="mt-2">
                    <label className="text-lg font-medium text-gray-900">N°</label>
                        <input
                            className="focus:outline-none focus:border-azul-hyde border-b-2 w-full p-2"
                            placeholder= "N°"
                            name="numero_endereco"
                            onChange={handleUser}
                            />
                    </div>
                    <div className="mt-2">
                    <label className="text-lg font-medium text-gray-900">Senha *</label>
                        <input
                            type="password"
                            className="focus:outline-none focus:border-azul-hyde border-b-2 w-full p-2"
                            placeholder="Senha"
                            name="senha"
                            onChange={handleUser}
                            />
                    </div>
                    <div className="mt-2">
                    <label className="text-lg font-medium text-gray-900">Confirme sua senha *</label>
                        <input
                            type="password"
                            className="focus:outline-none focus:border-azul-hyde border-b-2 w-full p-2"
                            placeholder="Confirme sua senha"
                            name="confirmarsenha"
                            onChange={handleUser}
                            />
                    </div>
                </div>
                <div className="mt-8 flex justify-center items-center flex-col">
                    <button className="hover:bg-cyan-600 mb-6 bg-azul-hyde p-2 rounded-3xl text-white font-bold text-lg w-80"
                    onClick={() => handleCad()}
                    >Cadastrar</button>
                     <p className={status ? "text-green-500" : "text-red-500"}>{status ? status : statusErro}</p>
                </div>
                <div>
                    <Link className="no-underline flex items-center " to='/login'>
                        <p className="text-black font-bold mb-1 text-lg">Já possui uma conta?</p>
                        <p className="ml-2 text-azul-hyde font-bold mb-1 text-lg">Login</p>
                    </Link>                                   
                </div>
        </div>
    );
}

export default CadEmp