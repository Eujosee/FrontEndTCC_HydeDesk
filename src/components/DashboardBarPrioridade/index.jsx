import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import moment from "moment";
import ptBrLocal from "moment/locale/pt-br";

const meses = {
  jan: "jan",
  feb: "fev",
  mar: "mar",
  apr: "abr",
  may: "mai",
  jun: "jun",
  jul: "jul",
  aug: "ago",
  sep: "set",
  oct: "out",
  nov: "nov",
  dec: "dez",
};

export default function DashboardBarPrioridade({ chamados }) {
  const [color, setColor] = useState(localStorage.getItem('color-theme'))
  const [data, setData] = useState(null);
  const datahj = moment().locale("pt-br", ptBrLocal).format("YYYYMMDD");

  const [prioridade, setPrioridade] = useState("Baixa");

  moment.locale("pt-br", ptBrLocal);

  function handleSetData() {
    const dataGraphic = [];

    for (let i = 0; i < 12; i++) {
      dataGraphic.push({
        name: moment(datahj).subtract(i, "months").format("MMM/YY"),
        uv: 0,
      });
    }

    chamados.forEach((chamado) => {
      const dataChamado = moment(chamado.data).format("MMM/YY");

      dataGraphic.forEach((item) => {
        if (item.name === dataChamado) {
          if (chamado.prioridade === prioridade) {
            item.uv += 1;
          }
        }
      });
    });

    dataGraphic.forEach((item) => {
      Object.keys(meses).forEach((key) => {
        const [mes, dia] = item.name.split("/");

        if (mes.toLowerCase() === key) {
          item.name = `${meses[key]}/${dia}`;
        }
      });
    });

    dataGraphic.reverse();

    setData(dataGraphic);
  }

  useEffect(() => {
    handleSetData();
  }, [prioridade]);

  return (
    <div className="w-full h-full">
      <div className="flex gap-5">
        <button className="dark:text-white hover:text-azul-hyde dark:hover:text-azul-hyde" onClick={() => setPrioridade("Baixa")}>Baixa</button>
        <button className="dark:text-white hover:text-azul-hyde dark:hover:text-azul-hyde" onClick={() => setPrioridade("Média")}>Média</button>
        <button className="dark:text-white hover:text-azul-hyde dark:hover:text-azul-hyde" onClick={() => setPrioridade("Alta")}>Alta</button>
      </div>
      
        <ResponsiveContainer width="100%" height={250}>

        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          
          {color == "dark" ? 
            <XAxis dataKey="name" stroke="#fff"/>
            :
            <XAxis dataKey="name" stroke="#000"/>
          }
          <YAxis  hide={true} />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="uv"
            fill={
              prioridade === "Baixa"
                ? "#22C55E"
                : prioridade === "Média"
                ? "#EAB308"
                : "#EF4444"
            }
            background={{ fill: "#E4E8EF" }}
            minPointSize={10}
            legendType="none"
            label={{ position: "top" }}
          ></Bar>
        </BarChart>
        </ResponsiveContainer>
    </div>
  );
}
