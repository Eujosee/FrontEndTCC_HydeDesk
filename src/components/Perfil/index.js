import PerfilEmpresa from "../PerfilEmpresa";
import PerfilFuncionario from "../PerfilFuncionario";
import PerfilTecnico from "../PerfilTecnico";
import secureLocalStorage from "react-secure-storage";

export default function CardPerfil() {
  const tipo = JSON.parse(secureLocalStorage.getItem("Tipo"));
  switch (tipo) {
    case "tecnicos":
      return(
		<PerfilTecnico/>
	  )
    case "empresas":
		return(
			<PerfilEmpresa/>
		)
    case "funcionarios":
		return(
			<PerfilFuncionario/>
		)
    default:
      break;
  }
}
