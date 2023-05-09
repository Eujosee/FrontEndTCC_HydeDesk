import React from "react";
import { useCallback, useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Sector,
  ResponsiveContainer,
  Tooltip,
  Cell,
} from "recharts";
import api from "../../services/api";
import secureLocalStorage from "react-secure-storage";
import Header from "../../components/Header";
export default function Dashboard() {
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
    async function getChamados() {
      const id = secureLocalStorage.getItem("Id");
      const response = await api.get(`/chamados?id_empresa=${id}`);
      const andamento = response.data.filter(
        (chamado) => chamado.status_chamado === "andamento"
      );
      const pendente = response.data.filter(
        (chamado) => chamado.status_chamado === "pendente"
      );
      const concluido = response.data.filter(
        (chamado) => chamado.status_chamado === "concluido"
      );
      const cancelado = response.data.filter(
        (chamado) => chamado.status_chamado === "cancelado"
      );
      setData([
        { name: "andamento", value: andamento.length },
        { name: "concluido", value: concluido.length },
        { name: "pendente", value: pendente.length },
        { name: "cancelado", value: cancelado.length },
      ]);
    }
    getChamados();
  }, []);
  return (
    <div>
        <Header />
      <div>
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx={200}
            cy={200}
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
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
      </div>
    </div>
  );
}
