import Header from "../../components/header";
import Form from "../../components/CadFunc"
import Imagemcad from "../../images/mobile.svg"


function CadastroFunc() {
    return (
        <div className="font-Poppins">
            <Header/>
        <div className="flex w-full h-full items-center justify-center ">
            <div className="flex items-center justify-center rounded shadow-2xl bg-white">
                <Form/>
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

export default CadastroFunc;