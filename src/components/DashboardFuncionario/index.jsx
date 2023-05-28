import { useState, useEffect } from "react";

export default function DashboardFuncionario({ chamados, funcionarios }) {
  const [dataFuncionario, setDataFuncionario] = useState(null);

  function handleData() {
    const dataLocal = [];

    funcionarios.forEach((funcionario) => {
      dataLocal.push({
        id_funcionario: funcionario.id_funcionario,
        nome: funcionario.nome_funcionario,
        foto: funcionario.foto,
        matricula: funcionario.matricula,
        total_chamado: 0,
      });
    });

    chamados.forEach((chamados) => {
      dataLocal.forEach((item) => {
        if (chamados.funcionario_id === item.id_funcionario) {
          item.total_chamado += 1;
        }
      });
    });

    setDataFuncionario(dataLocal);
  }

  useEffect(() => {
    handleData();
  }, []);

  return (
    <div className="min-w-full min-h-full flex items-center justify-center overflow-auto">
    <table className="w-full">
      {dataFuncionario ?
        dataFuncionario.map((data) => {
          return (
            <tr key={data.id_funcionario}  className="flex items-center gap-x-10">
              <td className="w-24 h-[70px] md:w-20 md:h-20">
                <img
                  src={`https://rei0mqdqxi.execute-api.us-east-1.amazonaws.com/${data.foto}`}
                  alt="teste"
                  className="max-w-full h-full object-cover rounded-full"
                />
              </td>
              <td>
                <p className="font-semibold dark:text-white">{data.nome}</p>
                <p className="text-sm dark:text-gray-200">Nome completo</p>
              </td>
              <td>
                <p className="font-semibold dark:text-white">{data.matricula}</p>
                <p className="text-sm dark:text-gray-200">Matricula</p>
              </td>
              <td>
                <p className="font-semibold dark:text-white">{data.total_chamado}</p>
                <p className="text-sm dark:text-gray-200">Total chamados</p>
              </td>
            </tr>
          );
        }) : 
        <span className="dark:text-gray-50 font-bold text-xl w-full">Não há dados disponíveis</span>
        }
    </table>
    </div>
  );
}
