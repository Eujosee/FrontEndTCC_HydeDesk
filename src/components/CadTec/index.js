import api from "../../api"
import { Link } from "react-router-dom";
import { useState } from "react";
import Imagemcad from "../../images/mobile.svg"

function CadTec () {
    const [status, setStatus] = useState('');
    const [statusErro, setStatusErro] = useState('');
    const [imagem, setImagem] = useState("")
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
    console.log(user)
    const config = {
        headers: { "content-type": "multipart/form-data" },
    };
    
    const handleCad = async(e) => {
        e.preventDefault()

        try {
            let formData = new FormData();
            formData.append("nome", user.nome);
            formData.append("cpf", user.cpf);
            formData.append("email", user.email);
            formData.append("telefone", user.telefone);
            formData.append("especialidade", user.especialidade);
            formData.append("foto", imagem);
            formData.append("senha", user.senha);
            formData.append("confirmsenha", user.confirmsenha);

            console.log(formData.get("nome"))
            const { data } = await api.post('/tecnicos/cadastro', formData, config)
            console.log(data)
            setStatus(data.message)
        } catch (error) {
            setStatusErro(error.response.data.message);
        }


    }

    return (
        <div className="bg-white px-10 pb-10 pt-3">
                <form encType="multipart/form">
                    <div className="flex flex-col justify-center items-center mt-5">
                        <label className="text-lg font-medium text-gray-900">Foto de perfil</label>
                        <img className="w-40 rounded-full" src={Imagemcad} />
                    </div>
                <div className="sm:flex sm:flex-col lg:grid lg:grid-cols-2 lg:gap-x-10 lg:gap-y-2">
                        <div className="mt-2">
                        <label className="text-lg font-medium text-gray-900">Nome completo *</label>
                            <input
                                className="focus:outline-none focus:border-azul-hyde border-b-2 w-full  p-2"
                                placeholder= "Nome completo"
                                name="nome"
                                onChange={handleUser}
                                required
                                />
                        </div>
                        <div className="mt-2">
                        <label className="text-lg font-medium text-gray-900">CPF *</label>
                            <input
                                className="focus:outline-none focus:border-azul-hyde border-b-2 w-full  p-2"
                                placeholder= "CPF"
                                name="cpf"
                                onChange={handleUser}
                                required
                                />
                        </div>

                    <div className="mt-2">
                        <label className="text-lg font-medium text-gray-900">Email *</label>
                            <input
                                type="email"
                                className="focus:outline-none focus:border-azul-hyde border-b-2 w-full  p-2"
                                placeholder= "Email"
                                name="email"
                                onChange={handleUser}
                                required
                                />
                        </div>
                        <div className="mt-2">
                        <label className="text-lg font-medium text-gray-900">Telefone *</label>
                            <input
                                className="focus:outline-none focus:border-azul-hyde border-b-2 w-full  p-2"
                                placeholder= "Telefone"
                                type="tel"
                                name="telefone"
                                onChange={handleUser}
                                required
                                />
                        </div>
                    <div className="mt-2">
                        <label className="text-lg font-medium text-gray-900">Especialidade *</label>
                        <select className="focus:outline-none focus:border-azul-hyde border-b-2 w-full  p-2" name="especialidade" onChange={handleUser} required>
                            <option selected disabled>Selecione uma opção</option>
                            <option value="Desenvolvedor">Desenvolvedor</option>
                            <option value="Infraestrutura">Infraestrutura</option>
                            <option value="Sistemas operacionais">Sistemas operacionais</option>
                        </select>
                    </div>
                    <div className="mt-1">
                    <div className="flex flex-row">

                    <label className="text-lg font-medium text-gray-900">Foto de perfil *</label>
                    <p className="ml-3 mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">PNG, JPG ou JPEG.</p>
                    </div>
                        <input
                            type="file"
                            className="focus:outline-none focus:border-azul-hyde border-b-2 w-full  p-2"
                            placeholder="Selecione uma foto"
                            name="anexo"
                            accept=".png, .jpg, .jpeg"
                            onChange={(e) => setImagem(e.target.files[0])}
                            required
                            />
                    </div>
                    <div className="mt-2">
                    <label className="text-lg font-medium text-gray-900">Senha *</label>
                        <input
                            type="password"
                            className="focus:outline-none focus:border-azul-hyde border-b-2 w-full  p-2"
                            placeholder="Senha"
                            name="senha"
                            onChange={handleUser}
                            required
                            />
                    </div>
                    <div className="mt-2">
                    <label className="text-lg font-medium text-gray-900">Confirme sua senha *</label>
                        <input
                            type="password"
                            className="focus:outline-none focus:border-azul-hyde border-b-2 w-full  p-2"
                            placeholder="Confirme sua senha"
                            name="confirmsenha"
                            onChange={handleUser}
                            required
                            />
                    </div>
                </div>
                <div className="mt-8 flex justify-center items-center flex-col">
                    <button type="submit" className="hover:bg-cyan-600 mb-6 bg-azul-hyde p-2 rounded-3xl text-white font-bold text-lg w-80"
                    onClick={handleCad}
                    >Cadastrar</button>
                    <p className={status ? "text-green-500" : "text-red-500"}>{status ? status : statusErro}</p>
                </div>
                </form>
                <div>
                    <Link className="no-underline flex items-center " to='/login'>
                        <p className="text-black font-bold text-lg mb-1">Já possui uma conta?</p>
                        <p className="ml-2 text-azul-hyde text-lg font-bold mb-1">Login</p>
                    </Link>                                  
                </div>
        </div>
    );
}

export default CadTec