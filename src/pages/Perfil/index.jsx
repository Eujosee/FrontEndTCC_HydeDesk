import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CardPerfil from "../../components/CardPerfil";

export default function Perfil() {
  return (
    <>
      <Header />
      <div className="h-screen dark:bg-preto">
        <CardPerfil />
        <Footer />
      </div>
    </>
  );
}
