import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer"
import CardPerfil from "../../components/Perfil";
import api from "../../api";

export default function Perfil() {


  return (
    <div className="font-Poppins dark:bg-gray-900">
      <Header />
        <CardPerfil/>
      <Footer />
    </div>
  );
}
