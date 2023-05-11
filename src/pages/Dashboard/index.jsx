import React from "react";
import { useCallback, useState, useEffect } from "react";
import api from "../../services/api";
import secureLocalStorage from "react-secure-storage";
import Header from "../../components/Header";
import DashboardPie from "../../components/DashboardPie";
import DashboardAreaChart from "../../components/AreaChart";

export default function Dashboard() {
  const [dados, setDados] = useState();

  useEffect(() => {
    async function getDados() {
      const id = secureLocalStorage.getItem("Id");
      const response = await api.get(`/chamados?id_empresa=${id}`);
      setDados(response.data);
    }
    getDados();
  }, []);
  return (
    <div>
      <Header />
      {dados ? (
        <div>
          <DashboardPie chamados={dados} />
          <DashboardAreaChart chamados={dados} />
        </div>
      ) : null}
    </div>
  );
}
