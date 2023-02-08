import Header from "../../components/header";
import FormTec from "../../components/CadTec"
import FormEmp from "../../components/CadEmp"
import Imagemcad from "../../images/mobile.svg"
import { useState } from "react";


function CadastroTec() {
    const [escolha, setEscolha] = useState('tecnico')
    
    const handleChange = (event) => {
        setEscolha(event.target.value);
    };
    
    return (
        <div className="font-Poppins">
            <Header/>
        <div className="flex w-full h-full flex-col  justify-center ">
            <div className="w-1/2">
                <h1>Cadastrar como:</h1>
                <div>
                <input
                    type="radio"
                    name="escolhalogin"
                    value="tecnico"
                    onChange={handleChange}
                    defaultChecked
                />
                <label className="mr-4 ml-2 font-medium">Técnico</label>

                <input
                    type="radio"
                    name="escolhalogin"
                    value="empresa"
                    onChange={handleChange}
                />
                <label className="mr-4 ml-2 font-medium">Empresa</label>
                </div>
            </div>
            <div className="flex items-center justify-center bg-white">
               {escolha === "empresa" ? <FormEmp/> : <FormTec/>}
                <div className="hidden lg:flex justify-center items-center">
                    <div className="ml-10 mr-10 w-85 h-85">
                        <img src={Imagemcad} alt='Mulher mexendo no celular para fazer login'/>
                        {/* <a href="https://storyset.com/internet">Internet illustrations by Storyset</a> */}
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}

export default CadastroTec;