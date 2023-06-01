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
  ResponsiveContainer,
} from "recharts";


export default function DashboardBarChart({ chamados }) {
  const [color, setColor] = useState(localStorage.getItem('color-theme'))

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
    <div className="flex w-full max-w-full h-full justify-center items-center">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{
            top: 40,
            right: 50,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          {color == "dark" ? 
            <XAxis dataKey="name" stroke="#fff"/>
            :
            <XAxis dataKey="name" stroke="#000"/>
          }
          {color == "dark" ? 
            <YAxis stroke="#fff"/>
            :
            <YAxis stroke="#000"/>
          }
          
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="uv" fill="#000" legendType="none" >
            <Cell key="cell-0" fill="#FF5252" />
            <Cell key="cell-1" fill="#FBC02D" />
            <Cell key="cell-2" fill="#F57C00" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
