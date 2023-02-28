import api from "../../api";
import Footer from "../Footer";
import PerfilEmpresa from "../PerfilEmpresa";
import PerfilFuncionario from "../PerfilFuncionario";
import PerfilTecnico from "../PerfilTecnico";

export default function CardPerfil() {
  const tipo = JSON.parse(localStorage.getItem("Tipo"));
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
