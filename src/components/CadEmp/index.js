import api from "../../api"
import { Link } from "react-router-dom";
import { useState } from "react";

function CadEmp () {
    const [status, setStatus] = useState('');
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
        headers: { "content-type": "multipart/form-data" },
      };
    
    const handleCad = async() => {
        // try {
        //     let formData = new FormData();
        //     formData.append("nome", user.nome);
        //     formData.append("cpf", user.cpf);
        //     formData.append("email", user.email);
        //     formData.append("telefone", user.telefone);
        //     formData.append("especialidade", user.especialidade);
        //     formData.append("foto", imagem);
        //     formData.append("senha", user.senha);
        //     formData.append("confirmsenha", user.confirmsenha);

        //     const {data} = await api.post('/tecnicos/cadastro', formData, config)
        //     console.log(data)
        // } catch (error) {
        //     setStatus(error.response.data.message);
        // }


    }

    return (
        <div className="bg-white px-10 py-10 rounded">
            <h1 className="font-bold text-2xl">Cadastro para empresas</h1>
            <div>
                <form encType="multipart/form">

                    <div className="mt-8">
                    <label className="text-lg font-medium text-gray-900 dark:text-white">Nome da empresa</label>
                        <input
                            className="border-2 w-full rounded p-2"
                            placeholder= "Nome da empresa"
                            name="nome"
                            onChange={handleUser}
                            />
                    </div>
                    <div className="mt-2">
                    <label className="text-lg font-medium text-gray-900 dark:text-white">CNPJ</label>
                        <input
                            className="border-2 w-full rounded p-2"
                            placeholder= "CNPJ"
                            name="cnpj"
                            onChange={handleUser}
                            />
                    </div>
                    <div className="mt-2">
                    <label className="text-lg font-medium text-gray-900 dark:text-white">Email</label>
                        <input
                            type="email"
                            className="border-2 w-full rounded p-2"
                            placeholder= "Email"
                            name="email"
                            onChange={handleUser}
                            />
                    </div>
                    <div className="mt-2">
                    <label className="text-lg font-medium text-gray-900 dark:text-white">Telefone</label>
                        <input
                            className="border-2 w-full rounded p-2"
                            placeholder= "Telefone"
                            name="telefone"
                            onChange={handleUser}
                            />
                    </div>
                    <div className="mt-2">
                    <label className="text-lg font-medium text-gray-900 dark:text-white">CEP</label>
                        <input
                            className="border-2 w-full rounded p-2"
                            placeholder= "CEP"
                            name="cep"
                            onChange={handleUser}
                            />
                    </div>
                    <div className="mt-2">
                    <label className="text-lg font-medium text-gray-900 dark:text-white">Endereço completo</label>
                        <input
                            className="border-2 w-full rounded p-2"
                            placeholder= "Endereço Completo"
                            name="numero_endereco"
                            onChange={handleUser}
                            />
                    </div>
                    <div className="mt-2">
                    <label className="text-lg font-medium text-gray-900 dark:text-white">Senha</label>
                        <input
                            type="password"
                            className="border-2 w-full rounded p-2"
                            placeholder="Senha"
                            name="senha"
                            onChange={handleUser}
                            />
                    </div>
                    <div className="mt-2">
                    <label className="text-lg font-medium text-gray-900 dark:text-white">Confirme sua senha</label>
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
                    <p>{status}</p>
                </div>
                </form>
                <div>
                    <Link className="no-underline flex items-center " to='/login'>
                        <p className="text-black font-medium mb-1">Já possui uma conta?</p>
                        <p className="ml-2 text-cyan-500 font-medium mb-1">Login</p>
                    </Link>                  
                    <Link className="no-underline flex items-center " to='/cadastro-tecnico'>
                        <p className="text-black font-medium mb-1">Cadastrar como</p>
                        <p className="ml-1 text-cyan-500 font-medium mb-1">técnico</p>
                    </Link>                  
                </div>
            </div>
        </div>
    );
}

export default CadEmp