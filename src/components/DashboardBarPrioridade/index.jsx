import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
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
    <div>
      <div className="flex gap-5">
        <button onClick={() => setPrioridade("Baixa")}>Baixa</button>
        <button onClick={() => setPrioridade("Média")}>Média</button>
        <button onClick={() => setPrioridade("Alta")}>Alta</button>
      </div>
      <BarChart
        width={1000}
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
        <YAxis padding={{ top: 50 }} hide={true} />
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
    </div>
  );
}
