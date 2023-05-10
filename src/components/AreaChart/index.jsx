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
  const [data, setData] = useState([{
    name: "",
    uv: 0,
  }]);
  const datahj = moment().format("YYYYMMDD");
  const [lastDays, setlastDays] = useState([]);
  const teste = [];
  useEffect(() => {
    function QuantidadeChamados() {
      if (chamados != undefined) {
        for (let i = 0; i < 7; i++) {
          teste.push(moment(datahj).subtract(i, "days").format("DD/MM"));
        }
        const lastDaysLocal = [];
        teste.forEach((item1, index) => {
          chamados.forEach((item2) => {
            if (item1 == moment(item2.data).format("DD/MM")) {
              lastDaysLocal.push(chamados[index]);
            }
          });
        });
        console.log(lastDaysLocal)
        setlastDays(lastDaysLocal);
        lastDays.forEach((item, index) =>{
            console.log(moment(lastDays[index].data).format('DD/MM'))
            setData([...data, {name: moment(lastDays[index].data).format('DD/MM'), uv: lastDays.lenght}])
        })
        console.log(lastDaysLocal);
      }
    }
    QuantidadeChamados();
  }, [chamados]);
  return (
    <AreaChart
      width={500}
      height={400}
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
  );
}
