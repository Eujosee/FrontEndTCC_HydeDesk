import api from "../../api"
import { useState } from "react";

function CadFunc () {
    const [status, setStatus] = useState('');
    const [user,setUser] = useState({
        nome: "",
        nome_empresa: "",
        matricula: "",
        usuario: "",
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
            <h1 className="font-bold text-2xl">Cadastro para funcionários</h1>
            <div>
                <form encType="multipart/form">

                    <div className="mt-8">
                    <label className="text-lg font-medium text-gray-900 dark:text-white">Nome completo</label>
                        <input
                            className="border-2 w-full rounded p-2"
                            placeholder= "Nome completo"
                            name="nome"
                            onChange={handleUser}
                            />
                    </div>
                    <div className="mt-2">
                    <label className="text-lg font-medium text-gray-900 dark:text-white">Nome da empresa</label>
                        <input
                            className="border-2 w-full rounded p-2"
                            placeholder= "Nome da empresa"
                            name="nome_empresa"
                            onChange={handleUser}
                            />
                    </div>
                    <div className="mt-2">
                    <label className="text-lg font-medium text-gray-900 dark:text-white">Matrícula</label>
                        <input
                            className="border-2 w-full rounded p-2"
                            placeholder= "Matrícula"
                            name="matricula"
                            onChange={handleUser}
                            />
                    </div>
                    <div className="mt-2">
                    <label className="text-lg font-medium text-gray-900 dark:text-white">Nome de usuário</label>
                        <input
                            className="border-2 w-full rounded p-2"
                            placeholder= "Usuário"
                            name="usuario"
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
                            name="confirmsenha"
                            onChange={handleUser}
                            />
                    </div>
                <div className="mt-8 flex flex-col">
                    <button className="hover:bg-cyan-600 mb-6 bg-cyan-500 p-2 rounded-3xl text-white font-bold text-lg"
                    onClick={() => handleCad()}
                    >Cadastrar</button>
                    <p>{status}</p>
                </div>
                </form>
            </div>
        </div>
    );
}

export default CadFunc