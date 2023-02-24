import { useEffect, useState } from "react";
import Header from "../../components/header";
import CardPerfil from "../../components/Perfil";
import api from "../../api";

export default function Perfil(){
    const id = JSON.parse(localStorage.getItem("Id"));
    const busca = JSON.parse(localStorage.getItem("Tipo"));
    const [dados, setDados] = useState([])

    console.log(busca)

    useEffect(() => {
        const pegarDados = async () => {
            try {
                const {data} = await api.get('/' + busca + '/' + id);
                setDados(data)
     
            } catch (error) {
                console.log(error)
            }
        }
        pegarDados()
    }, [busca, id]) 
    
    
    

    return (
			<div className="font-Poppins dark:bg-preto">
				<Header />
				<div className="flex w-full h-screen items-center justify-center ">
					<div className="flex items-center justify-center rounded shadow-2xl">
						<CardPerfil {...dados} busca={busca} />
					</div>
				</div>
			</div>
		);
}