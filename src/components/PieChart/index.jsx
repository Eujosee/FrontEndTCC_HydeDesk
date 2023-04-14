import { useEffect } from "react";
import api from "../../services/api";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart({id, type}) {
    const dataStatus = []
    const [dataChart, setDataChart] = useState({})
    useEffect(() => {
        (async () => {
            if (type === "funcionario"){
                const { data } = await api.get("/chamados?funcionario_id=" + id)
                getStatusData(data)
            }else{
                const { data } = await api.get("/chamados?empresa_id=" + id)
                getStatusData(data)
            }
                setDataChart({
                    labels: ['Concluido', 'Pendente', 'Andamento', 'Cancelado'],
                    datasets:[
                        {
                            label:'Nº de chamados',
                            data: dataStatus,
                            backgroundColor: [
                                'rgba(75, 192, 192, 1)',
                                'rgba(255, 99, 132, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(54, 162, 235, 1)',
                            ],
                            borderColor: [
                                'rgba(75, 192, 192, 1)',
                                'rgba(255, 99, 132, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(54, 162, 235, 1)',
                              ],
                              borderWidth: 1,
                        },
                    ],
                })

        })()
    }, [])

    console.log(dataChart)

    function getStatusData(data) {
        let concluido = 0
        let pendente = 0
        let andamento = 0
        let cancelado = 0
        data.map((item) => {
            switch (item.status_chamado) {
                case "concluido":
                    concluido++
                    break;
                case "pendente":
                    pendente++
                    break;
                case "andamento":
                    andamento++
                    break;
                case "cancelado":
                    cancelado++
                    break;
                default:
                    break;
            }
        })
        return dataStatus.push(concluido, pendente, andamento, cancelado)
        
    }
    return(
        <>
        <div className="w-full h-full lg:w-3/5 lg:h-2/5 p-6  ring-1 ring-gray-900/5 shadow-lg rounded-xl flex flex-col items-center justify-center dark:bg-gray-800">
            <h1 className="font-medium text-xl dark:text-gray-50">Status dos chamados</h1>
            {
                // verifica se os dados estão setados antes de exibir o gráfico
                dataStatus && dataChart?.datasets ? (
                    <Pie data={dataChart}
                    options={{
                        plugins: {
                            datalabels: {
                                display: true,
                            },
                            legend: {
                                labels:{
                                    color: "#94a3b8",
                                }
                            }
                        },
                    }}
                    />
                ) : 
                // caso os dados não estejam setados, será exibida uma tela de carregamento
                <>
                <div className="flex gap-2 items-center justify-center  dark:bg-preto">
                    <AiOutlineLoading3Quarters
                        size={25}
                        className="animate-spin text-gray-900 dark:text-gray-50"
                    />
                    <p className="text-gray-900 dark:text-gray-50"> Carregando...</p>
                </div>
            </>
            }
        </div>
        </>
    )

}