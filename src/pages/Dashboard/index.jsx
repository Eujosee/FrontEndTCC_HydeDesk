import React from "react";
import { useCallback, useState, useEffect } from "react";
import api from "../../services/api";
import secureLocalStorage from "react-secure-storage";
import Header from "../../components/Header";
import moment from "moment";

import DashboardPie from "../../components/DashboardPie";
import DashboardAreaChart from "../../components/AreaChart";
import DashboardBarChart from "../../components/DashboardBarChart";
import DashboardFuncionario from "../../components/DashboardFuncionario";
import DashboardBarPrioridade from "../../components/DashboardBarPrioridade";

export default function Dashboard() {
  const id = secureLocalStorage.getItem("Id");
  const tipo = secureLocalStorage.getItem("Tipo");

  const [chamados, setChamados] = useState(null);
  const [conclusoes, setConclusoes] = useState(null);
  const [funcionarios, setFuncionarios] = useState(null);

  const [mediaAvaliacao, setMediaAvaliacao] = useState(0);
  const [mediaConclusao, setMediaConclusao] = useState(0);

  function calcMediaAvaliacao(conclusoes) {
    let totalConclusoesAvaliadas = 0;
    let soma = 0;

    conclusoes.forEach((conclusao) => {
      if (conclusao.num_avaliacao !== null) {
        totalConclusoesAvaliadas += 1;
        soma += Number(conclusao.num_avaliacao);
      }
    });

    let media = soma / totalConclusoesAvaliadas;

    setMediaAvaliacao(media.toFixed(1));
  }

  function calcMediaConclusao() {
    if (!chamados || !conclusoes) return;

    let totalConclusoes = conclusoes.length;
    let totalMinutos = 0;

    conclusoes.forEach((conclusao) => {
      chamados.forEach((chamado) => {
        if (chamado.id_chamado === conclusao.chamado_id) {
          // console.log("data chamado", chamado.data);
          // console.log("data termino", conclusao.data_termino);

          const diferenca = moment(conclusao.data_termino).diff(
            moment(chamado.data)
          );

          let minutes = moment.duration(diferenca).asMinutes();

          totalMinutos += minutes;
        }
      });
    });

    let mediaMinutos = (totalMinutos / totalConclusoes).toFixed(2);
    let mediaHoras = (mediaMinutos / 60).toFixed();
    setMediaConclusao(Number(mediaHoras));
  }

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

      calcMediaAvaliacao(response.data);
      setConclusoes(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleGet() {
    await getChamados();
    getFuncionarios();
    getConclusoes();
  }

  useEffect(() => {
    handleGet();
  }, []);

  useEffect(() => {
    calcMediaConclusao();
  }, [chamados, conclusoes]);

  return (
    <div>
      <Header />
      {chamados && (
        <div>
          <DashboardPie chamados={chamados} />
          <DashboardAreaChart chamados={chamados} />
          <DashboardBarChart chamados={chamados} />
          <div>
            <p>Tempo médio de conclusão</p>
            {mediaConclusao}h
          </div>
          <div>
            <p>Avaliação média</p>
            {mediaAvaliacao}
          </div>
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
