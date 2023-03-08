import Header from "../../components/Header";
import Footer from "../../components/Footer"
import CardPerfil from "../../components/Perfil";

export default function Perfil() {
  return (
    <div className="h-screen dark:bg-gray-900">
      <Header />
        <CardPerfil/>
      <Footer />
    </div>
  );
}
