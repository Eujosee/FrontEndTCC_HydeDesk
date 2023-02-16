import Header from "../../components/header";
import Form from "../../components/formNovaSenha";

import ImagemLogin from "../../images/loginamico.svg"

export default function MudaSenha(){
    return(
      <div className="font-poppins">
        <Header/>
        <div className="flex w-full h-screen items-center justify-centerflex w-full h-screen items-center justify-center">
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
    )
}