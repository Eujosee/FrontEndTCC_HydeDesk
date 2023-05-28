import React from "react";
import { useState, useEffect } from "react";
import api from "../../services/api";
import secureLocalStorage from "react-secure-storage";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import moment from "moment";

import DashboardPie from "../../components/DashboardPie";
import DashboardAreaChart from "../../components/AreaChart";
import DashboardBarChart from "../../components/DashboardBarChart";
import DashboardFuncionario from "../../components/DashboardFuncionario";
import DashboardBarPrioridade from "../../components/DashboardBarPrioridade";
import Loading from "../../components/Loading";

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
    <div className="w-full min-h-screen dark:bg-gray-900 bg-gray-100">
      <Header />
      {chamados ? (
        <div className="p-6">
          <div className="flex flex-col md:flex-row mb-6 gap-y-4 gap-x-10">
            <div className="flex flex-col p-6 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
              <p className="dark:text-gray-50">Tempo médio de conclusão</p>
              <span className="dark:text-gray-50 font-bold text-xl">{isNaN(mediaConclusao) || mediaConclusao == 0 ? "Não há dados disponíveis" : mediaConclusao}</span>
            </div>
            <div className="flex flex-col p-6 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
              <p className="dark:text-gray-50">Avaliação média</p>
              <span className="dark:text-gray-50 font-bold text-xl">{isNaN(mediaAvaliacao) || mediaAvaliacao == 0 ? "Não há dados disponíveis" : mediaAvaliacao}</span>
            </div> 
          </div>

          <div className="w-full grid lg:grid-cols-3 gap-10 mb-6">
            <div className="flex justify-center items-center bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-auto">
              <DashboardPie chamados={chamados} />
            </div>
            <div className="flex justify-center items-center bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 overflow-auto">
              <DashboardAreaChart chamados={chamados} />
            </div>
            <div className="flex justify-center items-center bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-auto">
              <DashboardBarChart chamados={chamados} />
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 lg:justify-between">
            {funcionarios && (
              <div className="flex justify-center items-center bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 
              overflow-auto">
                <DashboardFuncionario
                  chamados={chamados}
                  funcionarios={funcionarios}
                />
              </div>
            )}
            <div className="flex w-full justify-center items-center bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 overflow-auto">
              <DashboardBarPrioridade chamados={chamados} />
            </div>
          </div>
        </div>
      ) :
      <Loading/>
      }
      <Footer/>
    </div>
  );
}
