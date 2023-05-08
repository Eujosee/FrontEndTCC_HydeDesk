import { useEffect } from "react";
import api from "../../services/api";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
ChartJS.register(ArcElement, Tooltip, Legend);

export default function DoughnutChart({id, type}) {
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
                    labels: ['Hardware', 'Software', 'Redes'],
                    datasets:[
                        {
                            label:'Quantidade',
                            data: dataStatus,
                            backgroundColor: [
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(255, 99, 132, 1)',
                            ],
                            borderColor: [
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(255, 99, 132, 1)',
                              ],
                              borderWidth: 1,
                        },
                    ],
                })

        })()
    }, [])

    function getStatusData(data) {
        let hardware = 0
        let software = 0
        let redes = 0
        data.map((item) => {
            switch (item.problema) {
                case "Hardware":
                    hardware++
                    break;
                case "Software":
                    software++
                    break;
                case "Redes":
                    redes++
                    break;
                default:
                    break;
            }
        })
        return dataStatus.push(hardware, software, redes)
        
    }
    return(
        <>
        <div className="w-full h-full lg:w-3/5 lg:h-2/5 p-6  ring-1 ring-gray-900/5 shadow-lg rounded-xl flex flex-col items-center justify-center dark:bg-gray-800">
            <h1 className="font-medium text-xl dark:text-gray-50">Principais problemas</h1>
            {
                // verifica se os dados estão setados antes de exibir o gráfico
                dataStatus && dataChart?.datasets ? (
                    <Doughnut data={dataChart}
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