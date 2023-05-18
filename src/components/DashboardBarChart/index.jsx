import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function DashboardBarChart({ chamados }) {
  const [data, setData] = useState([
    {
      name: "Software",
      uv: 0,
    },
    {
      name: "Hardware",
      uv: 0,
    },
    {
      name: "Infraestrutura",
      uv: 0,
    },
  ]);

  function handleSetData() {
    const dataCopy = [...data];

    chamados.map((chamado) => {
      dataCopy.forEach((item) => {
        if (chamado.problema === item.name) {
          item.uv += 1;
        }
      });
    });

    setData(dataCopy);
  }

  useEffect(() => {
    handleSetData();
  }, []);

  return (
    <BarChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="uv" fill="#000" legendType="none" >
        <Cell key="cell-0" fill="#FF5252" />
        <Cell key="cell-1" fill="#FBC02D" />
        <Cell key="cell-2" fill="#F57C00" />
      </Bar>
    </BarChart>
  );
}
