import Header from "../../components/header";
import FormTec from "../../components/CadTec"
import FormEmp from "../../components/CadEmp"
import Imagemcad from "../../images/mobile.svg"
import { useState } from "react";


function Cadastro() {
    const [escolha, setEscolha] = useState('tecnico')
    
    const handleChange = (event) => {
        setEscolha(event.target.value);
    };
    
    return (
        <>
        <div className="flex w-screen h-screen items-center  ">
            <div className="flex w-full  items-center">
                    <div className="hidden w-2/6 h-screen lg:flex bg-azul-claro-hyde justify-center items-center">
                            <img className="w-3/4 h-3/4" src={Imagemcad} alt='Mulher mexendo no celular para fazer login'/>
                            {/* <a href="https://storyset.com/internet">Internet illustrations by Storyset</a> */}
                    </div>
                <div className="flex flex-col w-full h-screen justify-center items-center">
                    <div className="lg:mt-10 lg:px-10 flex flex-col w-full">
                        <div className="flex flex-row">
                            <h1 className="font-extrabold mr-2 text-3xl">Bem vindo a</h1>
                            <h1 className="font-extrabold text-azul-hyde text-3xl">Hyde</h1>
                            <h1 className="font-extrabold  text-3xl">Desk</h1>
                        </div>
                        <div className="flex mt-8 flex-col">
                            <h1 className="font-bold text-xl">Registrar uma conta como:</h1>
                            <div className="">
                            <input
                                type="radio"
                                name="escolhalogin"
                                value="tecnico"
                                onChange={handleChange}
                                defaultChecked
                                />
                            <label className="mr-4 ml-2 font-medium text-xl">Técnico</label>

                            <input
                                type="radio"
                                name="escolhalogin"
                                value="empresa"
                                onChange={handleChange}
                                />
                            <label className="mr-4 ml-2 font-medium text-xl">Empresa</label>
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-3/4">
                        <div className="flex w-full items-center justify-center">
                        {escolha === "empresa" ? <FormEmp/> : <FormTec/>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default Cadastro;