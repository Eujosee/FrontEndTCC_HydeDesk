import { useState, useEffect } from "react";

export default function DashboardFuncionario({ chamados, funcionarios }) {
  const [dataFuncionario, setDataFuncionario] = useState(null);

  // {
  //   foto,
  //   nome,
  //   matricula,
  //   total_chamados,
  // }

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
    <table className="w-full overflow-auto">
      {dataFuncionario &&
        dataFuncionario.map((data) => {
          return (
            <tr key={data.id_funcionario} >
              <td>
                <img
                  src={`https://rei0mqdqxi.execute-api.us-east-1.amazonaws.com/${data.foto}`}
                  alt="teste"
                  className="w-20 h-20 object-cover"
                />
              </td>
              <td className="px-10">
                <p className="font-semibold">{data.nome}</p>
                <p className="text-sm">Nome completo</p>
              </td>
              <td className="px-10">
                <p className="font-semibold">{data.matricula}</p>
                <p className="text-sm">Matricula</p>
              </td>
              <td className="px-10">
                <p className="font-semibold">{data.total_chamado}</p>
                <p className="text-sm">Total chamados</p>
              </td>
            </tr>
          );
        })}
    </table>
  );
}
