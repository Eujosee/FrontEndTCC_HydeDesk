import moment from "moment/moment";
import React, { PureComponent, useEffect, useState } from "react";
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

  if (data === null) return <div></div>;

  return (
    <div>
      <div className="flex gap-6">
        <button
        className="dark:text-gray-50"
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
        className="dark:text-gray-50"
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
        className="dark:text-gray-50"
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
      <div className="w-[500px] max-w-full h-full">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            // width={500}
            // height={300}
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
          </AreaChart>
        </ResponsiveContainer>

      </div>
    </div>
  );
}
