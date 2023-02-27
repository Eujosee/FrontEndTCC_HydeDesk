import { useEffect, useState } from "react";
import Header from "../../components/header";
import Footer from "../../components/Footer";
import api from "../../api";
import CardPerfil from "../../components/Perfil";

export default function Perfil() {


  return (
    <div className="font-Poppins dark:bg-gray-900">
      <Header />
        <CardPerfil/>
      <Footer />
    </div>
  );
}
