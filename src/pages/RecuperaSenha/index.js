import { Link } from "react-router-dom";
import Header from "../../components/header";

import ImagemLogin from "../../images/loginamico.svg"
import Form from "../../components/formRecuperar"

export default function RecuperarSenha(){
    return(
        <div className="font-poppins">
            <Header/> 
            <div className="flex w-full h-screen items-center justify-center ">
            <div className="flex items-center justify-center">
                <Form/>
                <div className="hidden lg:flex justify-center items-center">
                    <div className="ml-10 mr-10 w-80 h-full ">
                        <img src={ImagemLogin} alt='Homem abrindo um cadeado virtual com uma chave'/>
                        {/* <a href="https://storyset.com/internet">Internet illustrations by Storyset</a> */}
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}