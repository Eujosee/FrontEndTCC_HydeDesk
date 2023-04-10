import { useEffect } from "react";
import api from "../../services/api";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart() {
    const dataStatus = []
    useEffect(() => {
        (async () => {
            const { data } = await api.get("/chamados")
            getStatusData(data)
        })()
    }, [])

    const data = {
                labels: ['Concluido', 'Pendente', 'Andamento', 'Cancelado'],
                datasets:[
                    {
                        label:'Nº de chamados',
                        data: dataStatus,
                        backgroundColor: [
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
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
            };

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
            <Pie data={data}
            redraw={true}
            options={{
                plugins: {
                    title: {
                        display: true,
                        text: "Status dos chamados",
                        fontSize: 20
                    }
                }
            }}
            />
        </>
    )

}