import React from "react";
import { useCallback, useState, useEffect } from "react";
import api from "../../services/api";
import secureLocalStorage from "react-secure-storage";
import Header from "../../components/Header";

import DashboardPie from "../../components/DashboardPie";
import DashboardAreaChart from "../../components/AreaChart";
import DashboardBarChart from "../../components/DashboardBarChart";
import DashboardFuncionario from "../../components/DashboardFuncionario";
import DashboardBarPrioridade from "../../components/DashboardBarPrioridade";

export default function Dashboard() {
  const id = secureLocalStorage.getItem("Id");
  const tipo = secureLocalStorage.getItem("Tipo");

  const [chamados, setChamados] = useState(null);
  const [funcionarios, setFuncionarios] = useState(null);

  console.log(tipo);

  async function getChamados() {
    try {
      const response = await api.get(`/chamados?id_empresa=${id}`);
      setChamados(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getFuncionarios() {
    try {
      const response = await api.get(`/funcionarios?id_empresa=${id}`);
      setFuncionarios(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getConclusoes() {
    try {
      const response = await api.get(`/conclusoes?id_empresa=${id}`); 

      console.log(response.data)
    } catch(error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getChamados();
    getFuncionarios();
    getConclusoes()
  }, []);
  return (
    <div>
      <Header />
      {chamados && (
        <div>
          <DashboardPie chamados={chamados} />
          <DashboardAreaChart chamados={chamados} />
          <DashboardBarChart chamados={chamados} />
          {funcionarios && (
            <DashboardFuncionario
              chamados={chamados}
              funcionarios={funcionarios}
            />
          )}
          <DashboardBarPrioridade chamados={chamados} />
        </div>
      )}
    </div>
  );
}
