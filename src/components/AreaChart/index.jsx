import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function DashboardAreaChart({ chamados }) {
  const [color, setColor] = useState(localStorage.getItem('color-theme'))
  const [data, setData] = useState(null);
  const datahj = moment().format("YYYYMMDD");

  function QuantidadeChamados({ count, interval, calendarFormat }) {
    const dataGraphic = [];

    if (chamados != undefined) {
      for (let i = 0; i < count; i++) {
        dataGraphic.push({
          name: moment(datahj).subtract(i, interval).format(calendarFormat),
          uv: 0,
        });
      }

      dataGraphic.reverse();

      chamados.forEach((chamado) => {
        const dataChamado = moment(chamado.data).format(calendarFormat);

        dataGraphic.forEach((item) => {
          if (item.name === dataChamado) {
            item.uv += 1;
          }
        });
      });

      setData(dataGraphic);
    }
  }

  useEffect(() => {
    QuantidadeChamados({
      count: 8,
      interval: "days",
      calendarFormat: "DD/MM/YYYY",
    });
  }, [chamados]);

  if (data === null) return <div><span className="dark:text-gray-50 font-bold text-xl">Não há dados disponíveis</span></div>;

  return (
    <div className=" flex flex-col w-full h-full justify-center">
      <div className="flex gap-6">
        <button
        className="dark:text-white hover:text-azul-hyde dark:hover:text-azul-hyde"
          onClick={() => {
            QuantidadeChamados({
              count: 8,
              interval: "days",
              calendarFormat: "DD/MM/YYYY",
            });
          }}
        >
          Últimos 7 dias
        </button>
        <button
        className="dark:text-white hover:text-azul-hyde dark:hover:text-azul-hyde"
          onClick={() => {
            QuantidadeChamados({
              count: 8,
              interval: "months",
              calendarFormat: "MM/YYYY",
            });
          }}
        >
          Últimos meses
        </button>
        <button
        className="dark:text-white hover:text-azul-hyde dark:hover:text-azul-hyde"
          onClick={() => {
            QuantidadeChamados({
              count: 8,
              interval: "years",
              calendarFormat: "YYYY",
            });
          }}
        >
          Anual
        </button>
      </div>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
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
            <Tooltip />
            <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
          </AreaChart>
        </ResponsiveContainer>
    </div>
  );
}
