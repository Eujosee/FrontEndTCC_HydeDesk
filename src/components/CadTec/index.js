import api from "../../api"
import { Link } from "react-router-dom";
import { useState } from "react";

function CadTec () {
    const [status, setStatus] = useState('');
    const [imagem, setImagem] = useState(null)
    const [user,setUser] = useState({
        nome: "",
        cpf: "",
        email: "",
        telefone: "",
        especialidade: "",
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
            <h1 className="font-bold text-2xl">Cadastro para técnicos</h1>
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
                    <label className="text-lg font-medium text-gray-900 dark:text-white">CPF</label>
                        <input
                            className="border-2 w-full rounded p-2"
                            placeholder= "CPF"
                            name="cpf"
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
                        <label className="text-lg font-medium text-gray-900 dark:text-white">Especialidade</label>
                        <select className="border-2 w-full rounded p-2" name="especialidade" onChange={handleUser}>
                            <option selected disabled>Selecione uma opção</option>
                            <option value="Desenvolvedor">Desenvolvedor</option>
                            <option value="Infraestrutura">Infraestrutura</option>
                            <option value="Sistemas operacionais">Sistemas operacionais</option>
                        </select>
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
                    <div className="mt-2">
                    <label className="text-sm font-medium text-gray-900 dark:text-white">Selecione uma foto de perfil</label>
                        <input
                            type="file"
                            className="border-2 w-full rounded p-2"
                            placeholder="Selecione uma foto"
                            name="anexo"
                            accept=".png, .jpg, .jpeg"
                            onChange={(e) => setImagem(e.file)}
                            />
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">PNG, JPG ou JPEG.</p>
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
                    <Link className="no-underline flex items-center " to='/cadastro-empresarial'>
                        <p className="text-black font-medium mb-1">Cadastrar como</p>
                        <p className="ml-1 text-cyan-500 font-medium mb-1">empresa</p>
                    </Link>                  
                </div>
            </div>
        </div>
    );
}

export default CadTec