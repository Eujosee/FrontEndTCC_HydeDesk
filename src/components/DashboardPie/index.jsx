import { useCallback, useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Sector,
  ResponsiveContainer,
  Tooltip,
  Cell,
} from "recharts";

export default function DashboardPie({ chamados }) {
  const [data, setData] = useState([
    { name: "andamento", value: 0 },
    { name: "concluido", value: 0 },
    { name: "pendente", value: 0 },
    { name: "cancelado", value: 0 },
  ]);
  const COLORS = ["#E2CD08", "#22C55E", "#23AFFF", "#EF4444"];
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  useEffect(() => {
    function getChamados() {
      if (chamados != undefined) {
        const andamento = chamados.filter(
          (chamado) => chamado.status_chamado === "andamento"
        );
        const pendente = chamados.filter(
          (chamado) => chamado.status_chamado === "pendente"
        );
        const concluido = chamados.filter(
          (chamado) => chamado.status_chamado === "concluido"
        );
        const cancelado = chamados.filter(
          (chamado) => chamado.status_chamado === "cancelado"
        );
        setData([
          { name: "andamento", value: andamento.length },
          { name: "concluido", value: concluido.length },
          { name: "pendente", value: pendente.length },
          { name: "cancelado", value: cancelado.length },
        ]);
      }
    }
    getChamados();
  }, [chamados]);
  return (
      <div className="flex flex-col xl:flex-row w-full h-full justify-center items-center">
        <div className="w-full flex flex-wrap xl:flex-col  gap-y-2 gap-x-4 p-4">
          <div className="flex items-center">
            <div className="bg-[#22C55E] w-[20px] h-[20px] rounded mr-2"></div>
            <span className="text-lg font-semibold">Concluído</span>
          </div>
          <div className="flex items-center">
            <div className="bg-[#E2CD08] w-[20px] h-[20px] rounded mr-2"></div>
            <span className="text-lg font-semibold">Andamento</span>
          </div>
          <div className="flex items-center">
            <div className="bg-[#23AFFF] w-[20px] h-[20px] rounded mr-2"></div>
            <span className="text-lg font-semibold">Pendente</span>
          </div>
          <div className="flex items-center">
            <div className="bg-[#EF4444] w-[20px] h-[20px] rounded mr-2"></div>
            <span className="text-lg font-semibold">Cancelado</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart  
          // width={400} height={300}
          >
            <Pie
              data={data}
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={100}
              margin={{
                top: 40,
                
              }}
              fill="#8884d8"
              dataKey="value"
              >
              {data.map((entry, index) => (
                <Cell
                key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

        </PieChart>
        </ResponsiveContainer>
      </div>
  );
}
